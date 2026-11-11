import os
import sys
import time
import logging
from pathlib import Path
from typing import Dict, Any, List

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from src.config import DATA_DIR
from src.vector_store import MilvusVectorStore
from src.caching import MultiTierCache
from src.ingestion import IngestionEngine

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

def run_corpus_ingestion(data_dir: Path = DATA_DIR) -> Dict[str, Any]:
    store = MilvusVectorStore()
    cache = MultiTierCache()
    engine = IngestionEngine(vector_store=store, cache=cache)

    total_chunks = 0
    total_docs = 0
    summary_by_company = {}

    start_time = time.time()
    print("=" * 75)
    print(" [*] STARTING MULTI-COMPANY CORPUS INGESTION")
    print(f" Source Directory: {data_dir.resolve()}")
    print("=" * 75)

    company_dirs = [d for d in data_dir.iterdir() if d.is_dir()]
    if not company_dirs:
        print("No company subdirectories found in data/.")
        store.close()
        return {"total_docs": 0, "total_chunks": 0}

    for comp_dir in sorted(company_dirs):
        comp_name = comp_dir.name.capitalize()
        if comp_name.lower() == "nvidia":
            comp_name = "NVIDIA"

        doc_files = list(comp_dir.glob("*.md")) + list(comp_dir.glob("*.txt"))
        print(f"\nProcessing Company: [{comp_name}] ({len(doc_files)} documents)")

        comp_chunks = 0
        for doc_file in sorted(doc_files):
            try:
                content = doc_file.read_text(encoding="utf-8")
                fname = doc_file.name.lower()
                doc_type = "general"
                if "financial" in fname or "10-k" in fname or "q4" in fname:
                    doc_type = "financial_report"
                elif "press_release" in fname or "pr_" in fname:
                    doc_type = "press_release"
                elif "strategic" in fname or "analysis" in fname:
                    doc_type = "market_analysis"
                elif "architecture" in fname or "platform" in fname:
                    doc_type = "technical_whitepaper"

                lines = content.splitlines()
                title = doc_file.stem.replace("_", " ").title()
                for l in lines[:5]:
                    if l.startswith("# "):
                        title = l[2:].strip()
                        break

                res = engine.ingest_document(
                    raw_text=content,
                    company=comp_name,
                    doc_title=title,
                    doc_type=doc_type,
                    source_url_or_file=doc_file.name,
                    published_date="2024-11-01"
                )
                chunk_c = res.get("chunks_inserted", 0)
                comp_chunks += chunk_c
                total_chunks += chunk_c
                total_docs += 1
                print(f"   [+] Ingested '{title[:35]}...' -> {chunk_c} chunks (Partition: {res.get('partition')})")
            except Exception as e:
                logger.error(f"Failed to ingest {doc_file.name}: {e}")

        summary_by_company[comp_name] = comp_chunks

    elapsed = time.time() - start_time
    stats = store.get_stats()
    store.close()

    print("\n" + "=" * 75)
    print(" [OK] INGESTION COMPLETED")
    print(f" Total Documents Ingested: {total_docs}")
    print(f" Total Chunks Created:     {total_chunks}")
    print(f" Elapsed Time:             {elapsed:.2f} seconds")
    print(" Active Collection Partitions:")
    for part, pstats in stats.get("partitions", {}).items():
        print(f"   * Partition `{part}` ({pstats.get('company')}): {pstats.get('chunk_count')} chunks")
    print("=" * 75)

    return {
        "total_docs": total_docs,
        "total_chunks": total_chunks,
        "elapsed_seconds": round(elapsed, 2),
        "summary_by_company": summary_by_company,
        "partitions": stats.get("partitions", {})
    }

if __name__ == "__main__":
    run_corpus_ingestion()
