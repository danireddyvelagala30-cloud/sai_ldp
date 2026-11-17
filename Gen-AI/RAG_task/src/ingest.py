import time
import logging
from typing import Dict, Any
from src.document_loader import DocumentLoader
from src.chunker import SectionAwareChunker
from src.embeddings import EmbeddingEngine
from src.milvus_store import MilvusVectorStore

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

def run_ingestion(drop_existing: bool = True) -> Dict[str, Any]:
    """
    Executes complete document processing and Milvus storage pipeline:
    1. Loads all company documents (financial reports, blog posts, press releases)
    2. Performs section-aware chunking preserving tables and metadata
    3. Computes dense vector embeddings using BGE-small ONNX model
    4. Stores chunks and vectors in Milvus Vector Store
    """
    start_time = time.time()
    print("=" * 70)
    print(" STARTING DOCUMENT INGESTION INTO MILVUS VECTOR STORE")
    print("=" * 70)

    loader = DocumentLoader()
    documents = loader.load_all_documents()
    print(f"\n[1/4] Loaded {len(documents)} corporate documents:")
    doc_types = {}
    for doc in documents:
        doc_types[doc.doc_type] = doc_types.get(doc.doc_type, 0) + 1
        print(f"      - [{doc.doc_type.upper()}] {doc.title} ({doc.source_file})")

    chunker = SectionAwareChunker()
    chunks = chunker.chunk_all(documents)
    print(f"\n[2/4] Generated {len(chunks)} section-aware chunks:")
    for dtype, count in doc_types.items():
        type_chunks = [c for c in chunks if c.doc_type == dtype]
        print(f"      - {dtype.replace('_', ' ').title()}: {count} docs -> {len(type_chunks)} chunks")

    print(f"\n[3/4] Generating {len(chunks)} vector embeddings with BAAI/bge-small-en-v1.5...")
    embedding_engine = EmbeddingEngine()
    chunk_texts = [c.text for c in chunks]
    emb_start = time.time()
    vectors = embedding_engine.embed_batch(chunk_texts, batch_size=32)
    emb_time = time.time() - emb_start
    print(f"      Completed {len(vectors)} embeddings in {emb_time:.2f}s ({len(vectors)/emb_time:.1f} chunks/sec).")

    print(f"\n[4/4] Ingesting vectors and rich metadata into Milvus collection...")
    vector_store = MilvusVectorStore()
    vector_store.init_collection(drop_existing=drop_existing)
    inserted_count = vector_store.insert_chunks(chunks, vectors)
    
    stats = vector_store.get_stats()
    vector_store.close()

    total_time = time.time() - start_time
    print("\n" + "=" * 70)
    print(" INGESTION COMPLETED SUCCESSFULLY!")
    print(f" - Total Documents: {len(documents)}")
    print(f" - Total Chunks Ingested: {inserted_count}")
    print(f" - Milvus Collection: {stats.get('collection_name')}")
    print(f" - Vector Dimensions: {len(vectors[0]) if vectors else 0}")
    print(f" - Total Processing Time: {total_time:.2f} seconds")
    print("=" * 70 + "\n")

    return {
        "document_count": len(documents),
        "chunk_count": len(chunks),
        "inserted_count": inserted_count,
        "elapsed_time": total_time,
        "stats": stats
    }

if __name__ == "__main__":
    run_ingestion(drop_existing=True)
