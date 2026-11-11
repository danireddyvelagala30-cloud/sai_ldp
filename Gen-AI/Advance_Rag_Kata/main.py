import os
import sys
import time
import argparse
from pathlib import Path
from typing import Optional

sys.path.insert(0, str(Path(__file__).resolve().parent))
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from src.rag_pipeline import AdvancedRAGPipeline
from src.ingest_corpus import run_corpus_ingestion
from src.config import extract_company_from_partition

def banner():
    print("=" * 80)
    print("   ADVANCED RETRIEVAL-AUGMENTED GENERATION (MULTI-COMPANY RAG)")
    print("   Milvus Partitions | Query Construction | Multi-Tier Caching | Agent Tools")
    print("=" * 80)

def handle_query(query_text: str, session_id: str = "cli_session", company: Optional[str] = None):
    rag = AdvancedRAGPipeline()
    print(f"\n[*] Analyst Query: \"{query_text}\"")
    if company and company != "all":
        print(f"[*] Company Scope: [{company}]")

    resp = rag.query(user_query=query_text, session_id=session_id, company_filter=company)

    print("\n" + "-" * 80)
    print(" [1] QUERY CONSTRUCTION & DECOMPOSITION")
    print("-" * 80)
    print(f"  • Original Query:   {resp.user_query}")
    print(f"  • Rephrased Query:  {resp.rephrased_query}")
    print(f"  • Multi-Company:    {resp.is_multi_company}")
    print(f"  • Target Companies: {resp.target_companies}")
    print(f"  • Routed Partitions:{resp.target_partitions}")
    print("  • Sub-Queries Generated:")
    for i, sq in enumerate(resp.sub_queries, 1):
        print(f"    [{i}] {sq}")

    print("\n" + "-" * 80)
    print(" [2] CACHING & PERFORMANCE TELEMETRY")
    print("-" * 80)
    if resp.cache_hit_type:
        print(f"  • Cache Status:     HIT ({resp.cache_hit_type})")
        print(f"  • Execution Time:   {resp.elapsed_time_ms:.2f} ms")
        print(f"  • Latency Saved:    ~{resp.cache_latency_saved_ms:.1f} ms")
        if resp.semantic_similarity:
            print(f"  • Semantic Cosine:  {resp.semantic_similarity:.4f}")
    else:
        print(f"  • Cache Status:     MISS (Full Vector Search + Synthesis)")
        print(f"  • Execution Time:   {resp.elapsed_time_ms:.2f} ms")

    print("\n" + "-" * 80)
    print(" [3] EXECUTIVE BRIEF & SYNTHESIS")
    print("-" * 80)
    print(resp.answer)

    print("\n" + "-" * 80)
    print(" [4] AUDITED SOURCE CITATIONS")
    print("-" * 80)
    print(f"{'#':<3} | {'COMPANY':<12} | {'SCORE':<7} | {'SECTION':<25} | {'DOCUMENT'}")
    print("-" * 80)
    for c in resp.citations:
        sec = c.section[:24] if len(c.section) > 24 else c.section
        print(f"{c.index:<3} | {c.company:<12} | {c.score:<7.3f} | {sec:<25} | {c.doc_title[:30]}")

    rag.vector_store.close()

def handle_interactive():
    rag = AdvancedRAGPipeline()
    session_id = f"session_{int(time.time())}"
    banner()
    print(f"\nInteractive Session Started (Session ID: {session_id})")
    print("Type your questions naturally. Try multi-turn follow-ups, comparative inquiries, or type 'exit'.")
    print("Examples:")
    print("  1. What was Apple's total revenue in FY2024?")
    print("  2. How much did their Services division contribute?")
    print("  3. How does that compare with Microsoft's Cloud revenue?")
    print("  4. /discover Tesla (triggers autonomous web agent)")
    print("  5. /stats (views partition & cache metrics)")
    print("-" * 80)

    while True:
        try:
            user_input = input("\nAnalyst > ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit", "q"]:
                print("Exiting interactive session.")
                break

            if user_input.startswith("/discover"):
                parts = user_input.split(maxsplit=1)
                comp = parts[1] if len(parts) > 1 else "Apple"
                print(f"\n[*] Agent deploying web tools to discover corporate documents for {comp}...")
                res = rag.agent.discover_and_ingest_company(comp, session_id=session_id)
                print(res.get("summary", res))
                continue

            if user_input == "/stats":
                stats = rag.vector_store.get_stats()
                cstats = rag.cache.get_metrics()
                print("\n=== Vector Partitions ===")
                for p, d in stats.get("partitions", {}).items():
                    print(f"  • {p} ({d.get('company')}): {d.get('chunk_count')} chunks")
                print("\n=== Cache Telemetry ===")
                for k, v in cstats.items():
                    print(f"  • {k}: {v}")
                continue

            handle_query(user_input, session_id=session_id)

        except (KeyboardInterrupt, EOFError):
            print("\nSession terminated.")
            break

    rag.vector_store.close()

def handle_stats():
    rag = AdvancedRAGPipeline()
    stats = rag.vector_store.get_stats()
    cstats = rag.cache.get_metrics()
    banner()
    print("\n📊 MILVUS COLLECTION PARTITIONS")
    print("-" * 50)
    for p, d in stats.get("partitions", {}).items():
        print(f"  • Partition `{p}` [{d.get('company')}]: {d.get('chunk_count')} chunks")

    print("\n⚡ MULTI-TIER CACHE TELEMETRY")
    print("-" * 50)
    for k, v in cstats.items():
        print(f"  • {k:<25}: {v}")
    rag.vector_store.close()

def main():
    parser = argparse.ArgumentParser(description="Advanced Retrieval-Augmented Generation (Multi-Company RAG)")
    subparsers = parser.add_subparsers(dest="command", help="Available subcommands")

    q_parser = subparsers.add_parser("query", help="Execute single analyst query")
    q_parser.add_argument("query_text", type=str, help="Question to ask")
    q_parser.add_argument("--company", type=str, default=None, help="Filter to specific company")
    q_parser.add_argument("--session", type=str, default="cli_session", help="Session ID for chat history")

    subparsers.add_parser("chat", help="Start interactive multi-turn analyst chat session")

    subparsers.add_parser("ingest", help="Ingest all corporate documents into Milvus partitions")

    d_parser = subparsers.add_parser("discover", help="Agent searches web and auto-ingests company")
    d_parser.add_argument("--company", type=str, required=True, help="Company to search on web")

    subparsers.add_parser("stats", help="Display partition and cache telemetry")

    args = parser.parse_args()

    if args.command == "query":
        handle_query(args.query_text, session_id=args.session, company=args.company)
    elif args.command == "chat":
        handle_interactive()
    elif args.command == "ingest":
        run_corpus_ingestion()
    elif args.command == "discover":
        rag = AdvancedRAGPipeline()
        res = rag.agent.discover_and_ingest_company(args.company)
        print(res.get("summary", res))
        rag.vector_store.close()
    elif args.command == "stats":
        handle_stats()
    else:
        handle_interactive()

if __name__ == "__main__":
    main()
