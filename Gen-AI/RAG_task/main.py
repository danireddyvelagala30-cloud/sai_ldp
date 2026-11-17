import argparse
import sys
from src.ingest import run_ingestion
from src.rag_engine import RAGEngine
from src.evaluation import run_benchmark_evaluation
from src.milvus_store import MilvusVectorStore

def format_currency_box(title: str):
    print("\n" + "=" * 75)
    print(f" {title.upper()}")
    print("=" * 75)

def handle_query(query_text: str, top_k: int = 5, doc_filter: str = "all"):
    rag = RAGEngine()
    format_currency_box("Analyst Inquiry")
    print(f"Query: \"{query_text}\"")
    if doc_filter and doc_filter != "all":
        print(f"Document Filter: [{doc_filter}]")
    print(f"Retrieving Top {top_k} Chunks from Milvus...")

    response = rag.query(
        user_query=query_text,
        top_k=top_k,
        doc_type_filter=doc_filter if doc_filter != "all" else None
    )
    rag.vector_store.close()

    format_currency_box(f"Executive Response ({response.provider.upper()})")
    print(response.answer)

    format_currency_box("Verified Source Attributions")
    print(f"{'#':<4} | {'SOURCE FILE':<42} | {'SCORE':<7} | {'SECTION':<25}")
    print("-" * 85)
    for c in response.citations:
        sec = c.section[:24] if len(c.section) > 24 else c.section
        print(f"{c.index:<4} | {c.source_file:<42} | {c.score:<7.3f} | {sec:<25}")

    print("\n" + "-" * 85)
    print("Evidence Snippets:")
    for c in response.citations[:3]:
        snippet_clean = c.snippet[:200].replace('\n', ' ')
        print(f"  [{c.index}] {c.source_file} (Section: {c.section}):")
        print(f"      \"{snippet_clean}...\"\n")

def interactive_mode():
    format_currency_box("NVIDIA Business Analyst RAG System - Interactive Session")
    print("Type your questions below. Type 'exit' or 'quit' to terminate.\n")
    rag = RAGEngine()

    sample_questions = [
        "1. What was NVIDIA's total revenue and growth rate for FY2025?",
        "2. Break down revenue by market platform (Data Center, Gaming, ProViz, Automotive).",
        "3. What are the key architectural improvements of Blackwell over Hopper?",
        "4. What is NVIDIA NIM and how does it accelerate enterprise generative AI?",
        "5. Which automakers and trucking companies have selected DRIVE Thor?"
    ]
    print("Sample Questions to try:")
    for sq in sample_questions:
        print("  " + sq)
    print("-" * 75)

    while True:
        try:
            user_input = input("\n[Analyst Query] > ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit", "q"]:
                print("Exiting interactive session.")
                break

            handle_query(user_input, top_k=5)
        except (KeyboardInterrupt, EOFError):
            print("\nSession ended.")
            break

def main():
    parser = argparse.ArgumentParser(
        description="RAG-Powered Business Analyses System for Corporate Documents (Milvus + ONNX)"
    )
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    parser_ingest = subparsers.add_parser("ingest", help="Ingest and embed all documents into Milvus")
    parser_ingest.add_argument("--drop", action="store_true", default=True, help="Drop existing collection")

    parser_query = subparsers.add_parser("query", help="Execute an analyst query")
    parser_query.add_argument("query", type=str, help="Question string")
    parser_query.add_argument("--top-k", type=int, default=5, help="Number of retrieved chunks")
    parser_query.add_argument(
        "--filter",
        type=str,
        default="all",
        choices=["all", "financial_report", "blog_post", "press_release"],
        help="Optional metadata filter by document category"
    )

    subparsers.add_parser("interactive", help="Start interactive CLI analyst session")

    subparsers.add_parser("eval", help="Run benchmark evaluation across standard business analyst queries")

    subparsers.add_parser("stats", help="Show Milvus collection status and statistics")

    args = parser.parse_args()

    if args.command == "ingest":
        run_ingestion(drop_existing=args.drop)
    elif args.command == "query":
        handle_query(args.query, top_k=args.top_k, doc_filter=args.filter)
    elif args.command == "interactive":
        interactive_mode()
    elif args.command == "eval":
        run_benchmark_evaluation()
    elif args.command == "stats":
        store = MilvusVectorStore()
        stats = store.get_stats()
        format_currency_box("Milvus Vector Store Statistics")
        print(f"Collection Name: {stats.get('collection_name')}")
        print(f"Collection Exists: {stats.get('exists')}")
        print(f"Total Rows / Chunks: {stats.get('row_count')}")
        store.close()
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
