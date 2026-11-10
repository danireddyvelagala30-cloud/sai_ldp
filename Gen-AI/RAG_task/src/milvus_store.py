import logging
from typing import List, Dict, Any, Optional
from pymilvus import MilvusClient
from src.config import MILVUS_URI, MILVUS_COLLECTION_NAME, EMBEDDING_DIM
from src.chunker import Chunk

logger = logging.getLogger(__name__)

class MilvusVectorStore:
    """
    Manages collection lifecycle, entity insertion, indexing, and vector similarity search
    using Milvus / Milvus Lite.
    """

    def __init__(self, uri: str = MILVUS_URI, collection_name: str = MILVUS_COLLECTION_NAME):
        self.uri = uri
        self.collection_name = collection_name
        self.client: Optional[MilvusClient] = None
        self._init_client()

    def _init_client(self):
        """Initializes connection to Milvus."""
        try:
            self.client = MilvusClient(uri=self.uri)
            logger.info(f"Connected to Milvus at {self.uri}")
        except Exception as e:
            logger.error(f"Failed to connect to Milvus: {e}")
            raise e

    def _ensure_client(self):
        if self.client is None:
            self._init_client()

    def collection_exists(self) -> bool:
        """Checks if the target collection exists."""
        self._ensure_client()
        return self.client.has_collection(collection_name=self.collection_name)

    def init_collection(self, drop_existing: bool = False):
        """
        Creates or recreates the Milvus collection with Cosine similarity metric.
        """
        if self.collection_exists():
            if drop_existing:
                logger.info(f"Dropping existing collection '{self.collection_name}'...")
                self.client.drop_collection(collection_name=self.collection_name)
            else:
                logger.info(f"Collection '{self.collection_name}' already exists.")
                return

        logger.info(f"Creating collection '{self.collection_name}' (dim={EMBEDDING_DIM}, metric=COSINE)...")
        self.client.create_collection(
            collection_name=self.collection_name,
            dimension=EMBEDDING_DIM,
            metric_type="COSINE",
            consistency_level="Strong"
        )
        logger.info(f"Collection '{self.collection_name}' initialized successfully.")

    def insert_chunks(self, chunks: List[Chunk], vectors: List[List[float]]) -> int:
        """
        Inserts chunks and their corresponding embedding vectors into Milvus.
        """
        if not chunks or not vectors:
            return 0

        data_rows: List[Dict[str, Any]] = []
        for i, (chunk, vec) in enumerate(zip(chunks, vectors)):
            row = {
                "id": i + 1,
                "vector": vec,
                "chunk_id": chunk.chunk_id,
                "doc_title": chunk.doc_title,
                "doc_type": chunk.doc_type,
                "source_file": chunk.source_file,
                "section": chunk.section,
                "date": chunk.date,
                "text": chunk.text
            }
            data_rows.append(row)

        batch_size = 100
        total_inserted = 0
        for i in range(0, len(data_rows), batch_size):
            batch = data_rows[i:i + batch_size]
            res = self.client.insert(
                collection_name=self.collection_name,
                data=batch
            )
            inserted_count = res.get("insert_count", len(batch))
            total_inserted += inserted_count

        logger.info(f"Successfully inserted {total_inserted} chunks into '{self.collection_name}'.")
        return total_inserted

    def load_collection(self):
        """Loads collection into memory for searching."""
        if self.collection_exists():
            try:
                self.client.load_collection(collection_name=self.collection_name)
            except Exception as e:
                logger.debug(f"Collection load status: {e}")

    def search(
        self,
        query_vector: List[float],
        top_k: int = 5,
        doc_type_filter: Optional[str] = None,
        filter_expr: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Performs vector similarity search against Milvus.
        Supports optional metadata filtering (e.g. by doc_type).
        """
        self._ensure_client()
        if not self.collection_exists():
            raise RuntimeError(f"Collection '{self.collection_name}' does not exist. Please run ingestion first.")

        self.load_collection()

        combined_filter = filter_expr or ""
        if doc_type_filter and doc_type_filter.lower() != "all":
            type_filter = f'doc_type == "{doc_type_filter}"'
            if combined_filter:
                combined_filter = f"({combined_filter}) and ({type_filter})"
            else:
                combined_filter = type_filter

        search_params = {
            "metric_type": "COSINE",
            "params": {"nprobe": 10}
        }

        search_args = {
            "collection_name": self.collection_name,
            "data": [query_vector],
            "limit": top_k,
            "output_fields": [
                "chunk_id",
                "doc_title",
                "doc_type",
                "source_file",
                "section",
                "date",
                "text"
            ],
            "search_params": search_params
        }

        if combined_filter:
            search_args["filter"] = combined_filter

        raw_results = self.client.search(**search_args)

        results: List[Dict[str, Any]] = []
        if raw_results and len(raw_results) > 0:
            for hit in raw_results[0]:
                entity = hit.get("entity", {})
                score = hit.get("distance", 0.0)
                results.append({
                    "score": float(score),
                    "chunk_id": entity.get("chunk_id", ""),
                    "doc_title": entity.get("doc_title", ""),
                    "doc_type": entity.get("doc_type", ""),
                    "source_file": entity.get("source_file", ""),
                    "section": entity.get("section", ""),
                    "date": entity.get("date", ""),
                    "text": entity.get("text", "")
                })

        return results

    def get_stats(self) -> Dict[str, Any]:
        """Returns statistics on the current Milvus collection."""
        if not self.collection_exists():
            return {"exists": False, "row_count": 0}
        
        desc = self.client.describe_collection(collection_name=self.collection_name)
        stats = self.client.get_collection_stats(collection_name=self.collection_name)
        return {
            "exists": True,
            "collection_name": self.collection_name,
            "row_count": stats.get("row_count", 0),
            "description": desc
        }

    def close(self):
        """Closes the Milvus client connection."""
        if self.client:
            self.client.close()
            self.client = None

if __name__ == "__main__":
    store = MilvusVectorStore()
    stats = store.get_stats()
    print("Milvus Store Status:", stats)
    store.close()
