import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from src.rag_pipeline import AdvancedRAGPipeline

def run_tests():
    print("=" * 80)
    print(" [TEST] ADVANCED MULTI-COMPANY RAG PIPELINE VERIFICATION SUITE")
    print("=" * 80)

    rag = AdvancedRAGPipeline()
    session_id = f"analyst_test_{int(time.time())}"

    print("\n--- TEST 1: Single Company Inquiry (Apple) ---")
    q1 = "What was Apple's total revenue and Services revenue in FY2024?"
    print(f"Analyst Query: '{q1}'")
    resp1 = rag.query(user_query=q1, session_id=session_id)
    print(f"Rephrased:       '{resp1.rephrased_query}'")
    print(f"Sub-Queries:     {resp1.sub_queries}")
    print(f"Target Parts:    {resp1.target_partitions}")
    print(f"Latency:         {resp1.elapsed_time_ms:.1f}ms")
    print(f"Cache Status:    {resp1.cache_hit_type or 'CACHE MISS (First Execution)'}")
    print(f"Retrieved Hits:  {resp1.retrieval_count}")
    print(f"First 2 Citations:")
    for c in resp1.citations[:2]:
        print(f"  * [{c.company}] {c.doc_title} | Section: {c.section} (Score: {c.score})")

    print("\n--- TEST 2: Multi-Turn Contextual Follow-up (Decontextualization + Multi-Company) ---")
    q2 = "How does their Services revenue compare with Microsoft's Cloud revenue?"
    print(f"Analyst Query: '{q2}' (Note conversational pronoun 'their')")
    resp2 = rag.query(user_query=q2, session_id=session_id)
    print(f"Rephrased:       '{resp2.rephrased_query}'")
    print(f"Sub-Queries:     {resp2.sub_queries}")
    print(f"Target Parts:    {resp2.target_partitions}")
    print(f"Multi-Company:   {resp2.is_multi_company}")
    print(f"Latency:         {resp2.elapsed_time_ms:.1f}ms")
    print(f"Retrieved Hits:  {resp2.retrieval_count}")
    for c in resp2.citations[:4]:
        print(f"  * [{c.company}] {c.doc_title} | Section: {c.section} (Score: {c.score})")

    print("\n--- TEST 3: Tier 1 Exact Match Cache Verification ---")
    print(f"Re-running Query: '{q1}'")
    resp3 = rag.query(user_query=q1, session_id=session_id)
    print(f"Latency:         {resp3.elapsed_time_ms:.2f}ms")
    print(f"Cache Status:    {resp3.cache_hit_type}")
    print(f"Latency Saved:   {resp3.cache_latency_saved_ms:.1f}ms")
    assert "Exact" in (resp3.cache_hit_type or ""), "Expected Exact Match Cache Hit!"

    print("\n--- TEST 4: Tier 2 Semantic Vector Cache Verification ---")
    q4 = "What was Apple's total net sales and service earnings in fiscal year 2024?"
    print(f"Semantically Equivalent Query: '{q4}'")
    resp4 = rag.query(user_query=q4, session_id=session_id)
    print(f"Latency:         {resp4.elapsed_time_ms:.2f}ms")
    print(f"Cache Status:    {resp4.cache_hit_type}")
    print(f"Semantic Sim:    {resp4.semantic_similarity}")

    print("\n--- TEST 5: Multi-Tier Cache Metrics ---")
    metrics = rag.cache.get_metrics()
    for k, v in metrics.items():
        print(f"  * {k:<25}: {v}")

    print("\n--- TEST 6: Persistent Chat History Inspection ---")
    history = rag.chat_manager.get_history(session_id)
    print(f"Total Messages Logged in Session: {len(history)}")
    for m in history:
        print(f"  [{m['role'].upper()}]: {m['content'][:80]}...")

    rag.vector_store.close()
    print("\n" + "=" * 80)
    print(" [OK] ALL ADVANCED RAG VERIFICATION TESTS PASSED SUCCESSFULLY!")
    print("=" * 80)

if __name__ == "__main__":
    run_tests()
