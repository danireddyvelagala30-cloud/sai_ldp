import os
import time
import hashlib
import logging
from typing import List, Dict, Any, Optional
from pymilvus import MilvusClient, DataType

from src.config import (
    MILVUS_DB_PATH,
    MILVUS_COLLECTION_NAME,
    EMBEDDING_DIM,
    DISTANCE_METRIC,
    get_partition_name,
    extract_company_from_partition
)

logger = logging.getLogger(__name__)

class MilvusVectorStore:
    def __init__(
        self,
        db_path: str = MILVUS_DB_PATH,
        collection_name: str = MILVUS_COLLECTION_NAME
    ):
        self.db_path = db_path
        self.collection_name = collection_name
        self.client: Optional[MilvusClient] = None
        self._ensure_collection()

    def _get_client(self) -> MilvusClient:
        if self.client is None:
            self.client = MilvusClient(uri=self.db_path)
        return self.client

    def close(self):
        if self.client:
            try:
                self.client.close()
            except Exception as e:
                logger.debug(f"Milvus client close note: {e}")
            finally:
                self.client = None

    def _ensure_collection(self):
        client = self._get_client()
        try:
            if not client.has_collection(collection_name=self.collection_name):
                logger.info(f"Creating Milvus collection '{self.collection_name}' (dim={EMBEDDING_DIM}, metric={DISTANCE_METRIC})...")
                client.create_collection(
                    collection_name=self.collection_name,
                    dimension=EMBEDDING_DIM,
                    metric_type=DISTANCE_METRIC
                )
        except Exception as e:
            logger.error(f"Error ensuring collection: {e}")
            raise e

    def ensure_partition(self, company_name: str) -> str:
        partition_name = get_partition_name(company_name)
        client = self._get_client()
        try:
            if not client.has_partition(collection_name=self.collection_name, partition_name=partition_name):
                logger.info(f"Creating new collection partition '{partition_name}' for company '{company_name}'...")
                client.create_partition(
                    collection_name=self.collection_name,
                    partition_name=partition_name
                )
            return partition_name
        except Exception as e:
            logger.error(f"Failed to ensure partition '{partition_name}': {e}")
            raise e

    def list_partitions(self) -> List[str]:
        client = self._get_client()
        try:
            all_parts = client.list_partitions(collection_name=self.collection_name)
            return [p for p in all_parts if p != "_default"]
        except Exception as e:
            logger.error(f"Failed to list partitions: {e}")
            return []

    def get_company_list(self) -> List[str]:
        parts = self.list_partitions()
        return [extract_company_from_partition(p) for p in parts]

    def insert(
        self,
        chunks: List[Dict[str, Any]],
        company_name: str
    ) -> int:
        if not chunks:
            return 0

        partition_name = self.ensure_partition(company_name)
        client = self._get_client()

        rows = []
        for i, c in enumerate(chunks):
            chunk_unique_str = f"{company_name}_{c.get('chunk_id', i)}_{i}_{time.time()}"
            int_id = int(hashlib.md5(chunk_unique_str.encode()).hexdigest()[:14], 16)
            row = {
                "id": int_id,
                "vector": c["vector"],
                "company": c.get("company", company_name),
                "doc_title": c.get("doc_title", "Untitled Document"),
                "doc_type": c.get("doc_type", "general"),
                "source_file": c.get("source_file", c.get("source_url", "")),
                "section": c.get("section", "Main"),
                "date": c.get("date", ""),
                "text": c.get("text", ""),
                "char_count": len(c.get("text", "")),
                "ingested_at": str(time.strftime("%Y-%m-%d %H:%M:%S"))
            }
            rows.append(row)

        res = client.insert(
            collection_name=self.collection_name,
            data=rows,
            partition_name=partition_name
        )
        insert_count = len(rows) if res else 0
        logger.info(f"Inserted {insert_count} chunks into partition '{partition_name}' for company '{company_name}'.")
        return insert_count

    def load_collection(self):
        client = self._get_client()
        try:
            client.load_collection(collection_name=self.collection_name)
        except Exception as e:
            logger.debug(f"Collection load note: {e}")

    def search(
        self,
        query_vector: List[float],
        top_k: int = 5,
        partition_names: Optional[List[str]] = None,
        company_filter: Optional[str] = None,
        doc_type_filter: Optional[str] = None,
        filter_expr: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        client = self._get_client()
        self.load_collection()

        target_partitions: Optional[List[str]] = None
        if partition_names:
            target_partitions = partition_names
        elif company_filter and company_filter.lower() != "all":
            target_partitions = [get_partition_name(company_filter)]

        if target_partitions:
            available_parts = set(client.list_partitions(collection_name=self.collection_name))
            target_partitions = [p for p in target_partitions if p in available_parts]
            if not target_partitions:
                logger.warning(f"Target partitions {partition_names} do not exist in collection.")
                return []

        filters = []
        if filter_expr:
            filters.append(filter_expr)
        if doc_type_filter and doc_type_filter.lower() != "all":
            filters.append(f'doc_type == "{doc_type_filter}"')

        combined_filter = " and ".join(filters) if filters else None

        search_args: Dict[str, Any] = {
            "collection_name": self.collection_name,
            "data": [query_vector],
            "limit": top_k,
            "output_fields": [
                "company",
                "doc_title",
                "doc_type",
                "source_file",
                "section",
                "date",
                "text"
            ],
            "search_params": {
                "metric_type": DISTANCE_METRIC,
                "params": {"nprobe": 10}
            }
        }

        if target_partitions:
            search_args["partition_names"] = target_partitions
        if combined_filter:
            search_args["filter"] = combined_filter

        raw_results = client.search(**search_args)

        results: List[Dict[str, Any]] = []
        if raw_results and len(raw_results) > 0:
            for hit in raw_results[0]:
                entity = hit.get("entity", {})
                score = hit.get("distance", 0.0)
                results.append({
                    "score": float(score),
                    "id": hit.get("id"),
                    "company": entity.get("company", ""),
                    "doc_title": entity.get("doc_title", ""),
                    "doc_type": entity.get("doc_type", ""),
                    "source_file": entity.get("source_file", ""),
                    "section": entity.get("section", ""),
                    "date": entity.get("date", ""),
                    "text": entity.get("text", "")
                })

        return results

    def get_stats(self) -> Dict[str, Any]:
        client = self._get_client()
        try:
            partitions = self.list_partitions()
            stats: Dict[str, Any] = {
                "collection_name": self.collection_name,
                "dimension": EMBEDDING_DIM,
                "metric_type": DISTANCE_METRIC,
                "partitions": {},
                "total_partitions": len(partitions)
            }

            for p in partitions:
                company = extract_company_from_partition(p)
                count_res = client.query(
                    collection_name=self.collection_name,
                    partition_names=[p],
                    output_fields=["count(*)"]
                )
                chunk_count = 0
                if count_res and len(count_res) > 0:
                    chunk_count = count_res[0].get("count(*)", 0)

                stats["partitions"][p] = {
                    "company": company,
                    "chunk_count": chunk_count
                }

            return stats
        except Exception as e:
            logger.error(f"Error getting vector store stats: {e}")
            return {"error": str(e), "partitions": {}}
