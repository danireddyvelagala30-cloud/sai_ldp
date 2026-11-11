import time
import logging
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field

from src.config import DEFAULT_TOP_K, get_partition_name
from src.vector_store import MilvusVectorStore
from src.chat_history import ChatHistoryManager
from src.query_constructor import QueryConstructor, QueryConstructionResult
from src.caching import MultiTierCache
from src.synthesizer import ExecutiveSynthesizer, Citation, SynthesizerResponse
from src.ingestion import IngestionEngine
from src.tools import AgentTools
from src.agent import BusinessAnalystAgent

logger = logging.getLogger(__name__)

@dataclass
class RAGPipelineResponse:
    user_query: str
    rephrased_query: str
    sub_queries: List[str]
    target_companies: List[str]
    target_partitions: List[str]
    is_multi_company: bool
    answer: str
    citations: List[Citation]
    provider: str
    retrieval_count: int
    elapsed_time_ms: float
    cache_hit_type: Optional[str] = None
    cache_latency_saved_ms: float = 0.0
    semantic_similarity: Optional[float] = None

class AdvancedRAGPipeline:

    def __init__(
        self,
        vector_store: Optional[MilvusVectorStore] = None,
        chat_manager: Optional[ChatHistoryManager] = None,
        cache: Optional[MultiTierCache] = None
    ):
        self.vector_store = vector_store or MilvusVectorStore()
        self.chat_manager = chat_manager or ChatHistoryManager()
        self.cache = cache or MultiTierCache()
        self.ingestion_engine = IngestionEngine(self.vector_store, self.cache)
        self.tools = AgentTools(self.vector_store, self.ingestion_engine, self.chat_manager, self.cache)
        self.agent = BusinessAnalystAgent(self.tools, self.chat_manager)
        self.query_constructor = QueryConstructor(self.chat_manager)
        self.synthesizer = ExecutiveSynthesizer()

    def query(
        self,
        user_query: str,
        session_id: str = "default_session",
        company_filter: Optional[str] = None,
        doc_type_filter: Optional[str] = None,
        top_k: int = DEFAULT_TOP_K
    ) -> RAGPipelineResponse:
        t0 = time.time()

        qc_result: QueryConstructionResult = self.query_constructor.construct(
            user_query=user_query,
            session_id=session_id,
            explicit_company=company_filter
        )

        rephrased = qc_result.rephrased_query
        target_partitions = qc_result.target_partitions
        target_companies = qc_result.target_companies
        sub_queries_texts = [sq.query_text for sq in qc_result.sub_queries]

        cached_exact = self.cache.get_exact(
            query=rephrased,
            partitions=target_partitions,
            filter_str=doc_type_filter
        )
        if cached_exact:
            elapsed_ms = (time.time() - t0) * 1000.0
            citations = [Citation(**c) for c in cached_exact.get("citations", [])]
            self.agent.record_analyst_turn(
                session_id=session_id,
                user_query=user_query,
                rephrased_query=rephrased,
                sub_queries=sub_queries_texts,
                company_targets=target_companies,
                answer=cached_exact["answer"],
                sources=[c.__dict__ for c in citations]
            )
            return RAGPipelineResponse(
                user_query=user_query,
                rephrased_query=rephrased,
                sub_queries=sub_queries_texts,
                target_companies=target_companies,
                target_partitions=target_partitions,
                is_multi_company=qc_result.is_multi_company,
                answer=cached_exact["answer"],
                citations=citations,
                provider=cached_exact.get("provider", "cache"),
                retrieval_count=len(citations),
                elapsed_time_ms=round(elapsed_ms, 2),
                cache_hit_type="Tier 1: Exact Match (Hash Cache)",
                cache_latency_saved_ms=cached_exact.get("original_latency_ms", 1200.0)
            )

        query_vector = self.ingestion_engine.embed_query(rephrased)

        cached_semantic = self.cache.get_semantic(
            query=rephrased,
            query_vector=query_vector,
            partitions=target_partitions
        )
        if cached_semantic:
            resp_data, sim_score = cached_semantic
            elapsed_ms = (time.time() - t0) * 1000.0
            citations = [Citation(**c) for c in resp_data.get("citations", [])]
            self.agent.record_analyst_turn(
                session_id=session_id,
                user_query=user_query,
                rephrased_query=rephrased,
                sub_queries=sub_queries_texts,
                company_targets=target_companies,
                answer=resp_data["answer"],
                sources=[c.__dict__ for c in citations]
            )
            return RAGPipelineResponse(
                user_query=user_query,
                rephrased_query=rephrased,
                sub_queries=sub_queries_texts,
                target_companies=target_companies,
                target_partitions=target_partitions,
                is_multi_company=qc_result.is_multi_company,
                answer=resp_data["answer"],
                citations=citations,
                provider=resp_data.get("provider", "cache"),
                retrieval_count=len(citations),
                elapsed_time_ms=round(elapsed_ms, 2),
                cache_hit_type=f"Tier 2: Semantic Cache (Similarity: {sim_score * 100:.1f}%)",
                cache_latency_saved_ms=resp_data.get("original_latency_ms", 1200.0),
                semantic_similarity=round(sim_score, 3)
            )

        self.cache.record_miss()

        all_candidate_chunks: List[Dict[str, Any]] = []
        seen_keys = set()

        for sq in qc_result.sub_queries:
            sub_vec = self.ingestion_engine.embed_query(sq.query_text)
            sub_partitions = [sq.target_partition] if sq.target_partition else target_partitions

            hits = self.vector_store.search(
                query_vector=sub_vec,
                top_k=top_k,
                partition_names=sub_partitions if sub_partitions else None,
                doc_type_filter=doc_type_filter
            )

            for rank, hit in enumerate(hits):
                key = f"{hit.get('company')}_{hit.get('source_file')}_{hit.get('section')}"
                if key not in seen_keys:
                    seen_keys.add(key)
                    hit["rrf_score"] = hit.get("score", 0.0) + (1.0 / (60.0 + rank))
                    all_candidate_chunks.append(hit)

        all_candidate_chunks.sort(key=lambda x: x.get("rrf_score", x.get("score", 0.0)), reverse=True)
        top_chunks = all_candidate_chunks[:top_k + (2 if qc_result.is_multi_company else 0)]

        synth_response: SynthesizerResponse = self.synthesizer.synthesize(
            query=user_query,
            retrieved_chunks=top_chunks,
            rephrased_query=rephrased,
            sub_queries=sub_queries_texts,
            is_multi_company=qc_result.is_multi_company
        )

        elapsed_ms = (time.time() - t0) * 1000.0

        cache_payload = {
            "answer": synth_response.answer,
            "citations": [c.__dict__ for c in synth_response.citations],
            "provider": synth_response.provider,
            "original_latency_ms": elapsed_ms
        }
        self.cache.put(
            query=rephrased,
            query_vector=query_vector,
            response=cache_payload,
            partitions=target_partitions,
            filter_str=doc_type_filter,
            original_latency_ms=elapsed_ms
        )

        self.agent.record_analyst_turn(
            session_id=session_id,
            user_query=user_query,
            rephrased_query=rephrased,
            sub_queries=sub_queries_texts,
            company_targets=target_companies,
            answer=synth_response.answer,
            sources=[c.__dict__ for c in synth_response.citations]
        )

        return RAGPipelineResponse(
            user_query=user_query,
            rephrased_query=rephrased,
            sub_queries=sub_queries_texts,
            target_companies=target_companies,
            target_partitions=target_partitions,
            is_multi_company=qc_result.is_multi_company,
            answer=synth_response.answer,
            citations=synth_response.citations,
            provider=synth_response.provider,
            retrieval_count=synth_response.retrieval_count,
            elapsed_time_ms=round(elapsed_ms, 2)
        )
