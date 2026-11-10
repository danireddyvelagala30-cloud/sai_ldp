import time
from typing import List, Dict, Any
from src.rag_engine import RAGEngine

BENCHMARK_SUITE = [
    {
        "id": "BA-01",
        "category": "Financial Performance",
        "query": "What was NVIDIA's total revenue and year-over-year growth rate for fiscal year 2025?",
        "expected_sources": ["nvidia_fy2025_q4_financial_report.md", "pr_2025_02_record_q4_fy25_financial_results.md"],
        "required_facts": ["96.31", "122%"]
    },
    {
        "id": "BA-02",
        "category": "Business Domains",
        "query": "What are NVIDIA's four primary market platforms or business domains and how much did each generate in FY25?",
        "expected_sources": ["nvidia_fy2025_q4_financial_report.md"],
        "required_facts": ["Data Center", "87", "Gaming", "11", "Professional Visualization", "Automotive"]
    },
    {
        "id": "BA-03",
        "category": "Profitability & Margins",
        "query": "What were NVIDIA's GAAP and non-GAAP gross margins and operating income for fiscal 2025?",
        "expected_sources": ["nvidia_fy2025_q4_financial_report.md", "pr_2025_02_record_q4_fy25_financial_results.md"],
        "required_facts": ["75.0%", "75.8%", "61"]
    },
    {
        "id": "BA-04",
        "category": "Hardware Architecture",
        "query": "What are the core technical innovations of the Blackwell architecture and how does GB200 NVL72 compare to Hopper?",
        "expected_sources": ["nvidia_blackwell_architecture_deepdive.md"],
        "required_facts": ["208 billion", "1.8 TB/s", "30x", "25x"]
    },
    {
        "id": "BA-05",
        "category": "Enterprise AI Software",
        "query": "What is NVIDIA NIM, what APIs does it support, and how does it improve enterprise inference throughput and latency?",
        "expected_sources": ["nvidia_nim_microservices_enterprise_ai.md"],
        "required_facts": ["Microservices", "REST", "TensorRT-LLM", "4x"]
    },
    {
        "id": "BA-06",
        "category": "Physical AI & Robotics",
        "query": "What is Project GR00T and how does NVIDIA use Omniverse and Isaac Sim for humanoid robot simulation?",
        "expected_sources": ["nvidia_physical_ai_omniverse_robotics.md"],
        "required_facts": ["GR00T", "Omniverse", "Isaac Sim", "humanoid", "Thor"]
    },
    {
        "id": "BA-07",
        "category": "Commercial Adoptions",
        "query": "Which global automakers and autonomous trucking companies have selected NVIDIA DRIVE Thor?",
        "expected_sources": ["pr_2025_01_drive_thor_autonomous_transport.md"],
        "required_facts": ["BYD", "Li Auto", "Zeekr", "Plus", "Waabi"]
    },
    {
        "id": "BA-08",
        "category": "Executive Strategy & Capital",
        "query": "What was Jensen Huang's statement regarding reasoning AI and Blackwell production, and what dividend was declared?",
        "expected_sources": ["pr_2025_02_record_q4_fy25_financial_results.md"],
        "required_facts": ["Jensen Huang", "reasoning", "$0.01", "dividend"]
    }
]

def run_benchmark_evaluation() -> Dict[str, Any]:
    """
    Runs systematic evaluation of RAG retrieval, source attribution, and answer accuracy
    against standard business analyst queries.
    """
    print("=" * 75)
    print(" STARTING RAG SYSTEM BENCHMARK EVALUATION")
    print("=" * 75)

    rag = RAGEngine()
    results: List[Dict[str, Any]] = []

    retrieval_successes = 0
    top1_source_matches = 0
    fact_coverage_scores = []
    start_time = time.time()

    for idx, test in enumerate(BENCHMARK_SUITE, 1):
        q_id = test["id"]
        category = test["category"]
        query = test["query"]
        expected_sources = test["expected_sources"]
        required_facts = test["required_facts"]

        print(f"\n[{idx}/{len(BENCHMARK_SUITE)}] Testing {q_id} ({category}):")
        print(f"      Query: \"{query}\"")

        res = rag.query(query, top_k=5)
        
        retrieved_files = [c.source_file for c in res.citations]
        source_retrieved = any(exp in retrieved_files for exp in expected_sources)
        top1_match = res.citations[0].source_file in expected_sources if res.citations else False

        if source_retrieved:
            retrieval_successes += 1
        if top1_match:
            top1_source_matches += 1

        searchable_text = (res.answer + " " + " ".join([c.snippet for c in res.citations])).lower()
        facts_found = [fact for fact in required_facts if fact.lower() in searchable_text]
        coverage = len(facts_found) / len(required_facts) if required_facts else 1.0
        fact_coverage_scores.append(coverage)

        top1_file = res.citations[0].source_file if res.citations else "None"
        top1_score = res.citations[0].score if res.citations else 0.0

        status = "PASSED" if source_retrieved and coverage >= 0.75 else "FLAGGED"
        print(f"      Top-1 Source: {top1_file} (Score: {top1_score:.3f})")
        print(f"      Source Match: {'YES' if source_retrieved else 'NO'} | Top-1 Match: {'YES' if top1_match else 'NO'}")
        print(f"      Fact Coverage: {coverage:.1%} ({len(facts_found)}/{len(required_facts)} facts verified)")
        print(f"      Benchmark Status: [{status}]")

        results.append({
            "id": q_id,
            "category": category,
            "query": query,
            "top1_source": top1_file,
            "top1_score": top1_score,
            "source_retrieved": source_retrieved,
            "top1_match": top1_match,
            "fact_coverage": coverage,
            "status": status,
            "provider": res.provider
        })

    elapsed = time.time() - start_time
    retrieval_rate = (retrieval_successes / len(BENCHMARK_SUITE)) * 100
    top1_accuracy = (top1_source_matches / len(BENCHMARK_SUITE)) * 100
    avg_fact_coverage = (sum(fact_coverage_scores) / len(fact_coverage_scores)) * 100

    print("\n" + "=" * 75)
    print(" BENCHMARK EVALUATION SUMMARY")
    print("=" * 75)
    print(f"Total Benchmark Queries:      {len(BENCHMARK_SUITE)}")
    print(f"Retrieval Success Rate:       {retrieval_rate:.1f}% ({retrieval_successes}/{len(BENCHMARK_SUITE)})")
    print(f"Top-1 Source Precision:       {top1_accuracy:.1f}% ({top1_source_matches}/{len(BENCHMARK_SUITE)})")
    print(f"Average Fact & Data Coverage: {avg_fact_coverage:.1f}%")
    print(f"Total Evaluation Time:        {elapsed:.2f} seconds")
    print("=" * 75 + "\n")

    rag.vector_store.close()
    return {
        "total_queries": len(BENCHMARK_SUITE),
        "retrieval_success_rate": retrieval_rate,
        "top1_source_precision": top1_accuracy,
        "average_fact_coverage": avg_fact_coverage,
        "results": results
    }

if __name__ == "__main__":
    run_benchmark_evaluation()
