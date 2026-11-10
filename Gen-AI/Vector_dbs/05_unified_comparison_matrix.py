import os
import time
import shutil
import random
import numpy as np

import chromadb
from pymilvus import MilvusClient


def print_banner(text: str):
    print("\n" + "=" * 78)
    print(f" {text}")
    print("=" * 78)


def display_syntax_comparison():
    print_banner("1. SYNTAX COMPARISON CHEAT SHEET ACROSS ALL 4 DATABASES")
    
    comparisons = [
        {
            "Operation": "Client Init",
            "ChromaDB": "client = chromadb.PersistentClient(path='./db')",
            "Pinecone": "pc = Pinecone(api_key='...')",
            "Weaviate": "client = weaviate.connect_to_local()",
            "Milvus": "client = MilvusClient(uri='./milvus.db')"
        },
        {
            "Operation": "Create Index",
            "ChromaDB": "client.create_collection('name', metadata={'hnsw:space': 'cosine'})",
            "Pinecone": "pc.create_index('name', dimension=1536, metric='cosine', spec=ServerlessSpec(...))",
            "Weaviate": "client.collections.create(name='name', vector_index_config=Configure.VectorIndex.hnsw())",
            "Milvus": "client.create_collection(collection_name='name', dimension=128, metric_type='COSINE')"
        },
        {
            "Operation": "Insert / Upsert",
            "ChromaDB": "col.add(ids=['1'], documents=['text'], metadatas=[{'cat': 'ai'}], embeddings=[[...]])",
            "Pinecone": "index.upsert(vectors=[{'id': '1', 'values': [...], 'metadata': {'cat': 'ai'}}])",
            "Weaviate": "col.data.insert(properties={'cat': 'ai'}, vector=[...])",
            "Milvus": "client.insert('col_name', [{'id': 1, 'vector': [...], 'cat': 'ai'}])"
        },
        {
            "Operation": "Vector Search",
            "ChromaDB": "col.query(query_embeddings=[vec], n_results=5)",
            "Pinecone": "index.query(vector=vec, top_k=5, include_metadata=True)",
            "Weaviate": "col.query.near_vector(near_vector=vec, limit=5)",
            "Milvus": "client.search('col_name', data=[vec], limit=5)"
        },
        {
            "Operation": "Metadata Filter",
            "ChromaDB": "where={'category': {'$eq': 'ai'}, 'rating': {'$gte': 4.5}}",
            "Pinecone": "filter={'category': {'$eq': 'ai'}, 'rating': {'$gte': 4.5}}",
            "Weaviate": "filters=(Filter.by_property('category').equal('ai') & ...)",
            "Milvus": "filter='category == \"ai\" and rating >= 4.5'"
        },
        {
            "Operation": "Hybrid Search",
            "ChromaDB": "Manual RRF or BM25 + dense re-ranking",
            "Pinecone": "Sparse-Dense Hybrid via Pinecone Sparse (SPLADE / BM25 vectors)",
            "Weaviate": "col.query.hybrid(query='text', vector=vec, alpha=0.5)",
            "Milvus": "client.hybrid_search(reqs=[dense_req, sparse_req], ranker=RRFRanker())"
        }
    ]

    for item in comparisons:
        print(f"\n[OPERATION: {item['Operation']}]")
        print(f"  * ChromaDB:  {item['ChromaDB']}")
        print(f"  * Pinecone:  {item['Pinecone']}")
        print(f"  * Weaviate:  {item['Weaviate']}")
        print(f"  * Milvus:    {item['Milvus']}")


def run_live_local_benchmark():
    print_banner("2. LIVE LOCAL BENCHMARK: CHROMADB vs MILVUS LITE")
    print("Benchmarking 250 records with 32-dimensional synthetic embeddings.\n")

    num_records = 250
    dim = 32
    np.random.seed(42)

    raw_vectors = np.random.randn(num_records, dim).astype(np.float32)
    norms = np.linalg.norm(raw_vectors, axis=1, keepdims=True)
    embeddings = (raw_vectors / norms).tolist()

    ids_chroma = [f"id_{i}" for i in range(num_records)]
    ids_milvus = list(range(num_records))
    
    categories = ["nlp", "vision", "audio", "multimodal", "database"]
    metadatas = [
        {"category": random.choice(categories), "score": round(random.uniform(1.0, 5.0), 2), "idx": i}
        for i in range(num_records)
    ]

    query_raw = np.random.randn(1, dim).astype(np.float32)
    query_vec = (query_raw / np.linalg.norm(query_raw)).tolist()[0]

    chroma_dir = "./benchmark_chroma_tmp"
    if os.path.exists(chroma_dir):
        shutil.rmtree(chroma_dir)
        
    chroma_client = chromadb.PersistentClient(path=chroma_dir)
    chroma_col = chroma_client.create_collection(name="bench_col", metadata={"hnsw:space": "cosine"})

    t0 = time.perf_counter()
    chroma_col.add(
        ids=ids_chroma,
        embeddings=embeddings,
        metadatas=metadatas
    )
    chroma_insert_time = (time.perf_counter() - t0) * 1000

    chroma_query_latencies = []
    for _ in range(20):
        t0 = time.perf_counter()
        _ = chroma_col.query(query_embeddings=[query_vec], n_results=5)
        chroma_query_latencies.append((time.perf_counter() - t0) * 1000)
    chroma_avg_query_time = sum(chroma_query_latencies) / len(chroma_query_latencies)

    t0 = time.perf_counter()
    chroma_filtered = chroma_col.query(
        query_embeddings=[query_vec],
        n_results=5,
        where={"category": {"$eq": "database"}}
    )
    chroma_filter_time = (time.perf_counter() - t0) * 1000

    try:
        shutil.rmtree(chroma_dir)
    except Exception:
        pass

    milvus_db = "./benchmark_milvus_tmp.db"
    if os.path.exists(milvus_db):
        if os.path.isdir(milvus_db):
            shutil.rmtree(milvus_db)
        else:
            os.remove(milvus_db)
        
    milvus_client = MilvusClient(uri=milvus_db)
    milvus_client.create_collection(
        collection_name="bench_col",
        dimension=dim,
        metric_type="COSINE",
        auto_id=False
    )

    milvus_data = [
        {"id": ids_milvus[i], "vector": embeddings[i], **metadatas[i]}
        for i in range(num_records)
    ]

    t0 = time.perf_counter()
    milvus_client.insert(collection_name="bench_col", data=milvus_data)
    milvus_insert_time = (time.perf_counter() - t0) * 1000

    milvus_query_latencies = []
    for _ in range(20):
        t0 = time.perf_counter()
        _ = milvus_client.search(collection_name="bench_col", data=[query_vec], limit=5)
        milvus_query_latencies.append((time.perf_counter() - t0) * 1000)
    milvus_avg_query_time = sum(milvus_query_latencies) / len(milvus_query_latencies)

    t0 = time.perf_counter()
    milvus_filtered = milvus_client.search(
        collection_name="bench_col",
        data=[query_vec],
        limit=5,
        filter='category == "database"'
    )
    milvus_filter_time = (time.perf_counter() - t0) * 1000

    try:
        if os.path.exists(milvus_db):
            if os.path.isdir(milvus_db):
                shutil.rmtree(milvus_db)
            else:
                os.remove(milvus_db)
    except Exception:
        pass

    print(f"{'Metric':<35} | {'ChromaDB':<18} | {'Milvus Lite':<18}")
    print("-" * 78)
    print(f"{'Batch Insert Time (' + str(num_records) + ' recs)':<35} | {chroma_insert_time:>14.2f} ms | {milvus_insert_time:>14.2f} ms")
    print(f"{'Avg Vector Search Latency':<35} | {chroma_avg_query_time:>14.2f} ms | {milvus_avg_query_time:>14.2f} ms")
    print(f"{'Filtered Vector Search Latency':<35} | {chroma_filter_time:>14.2f} ms | {milvus_filter_time:>14.2f} ms")
    print("-" * 78)


def display_architectural_matrix():
    print_banner("3. ARCHITECTURAL & DECISION GUIDE MATRIX")
    matrix = """
+------------+--------------------+---------------------+----------------------+---------------------+
| Feature    | ChromaDB           | Pinecone            | Weaviate             | Milvus              |
+------------+--------------------+---------------------+----------------------+---------------------+
| Best For   | Local dev, PoCs,   | Managed production, | Complex schemas,     | Massive enterprise, |
|            | lightweight RAG    | Zero-maintenance    | Built-in hybrid RRF  | Billion+ scale, GPU |
+------------+--------------------+---------------------+----------------------+---------------------+
| Deployment | In-process, Local, | Cloud SaaS only     | Self-hosted, Docker, | Milvus Lite (local),|
|            | Docker             | (Serverless / Pod)  | Weaviate Cloud (WCD) | Kubernetes, Cloud   |
+------------+--------------------+---------------------+----------------------+---------------------+
| Index Types| HNSW (hnswlib)     | Proprietary ANN     | HNSW, Dynamic Index, | HNSW, IVF_FLAT,     |
|            |                    |                     | Flat                 | DiskANN, GPU-IVF    |
+------------+--------------------+---------------------+----------------------+---------------------+
| Hybrid     | Manual combination | Sparse-dense        | Native 1st class     | Native multi-vector |
| Search     | or custom ranker   | vectors (SPLADE)    | (BM25 + Dense RRF)   | + RRF rankers       |
+------------+--------------------+---------------------+----------------------+---------------------+
| Language   | Python native      | Multi-language SDKs | Go core with Python, | Go/C++ core with    |
| Core       | (C++ hnswlib)      |                     | TypeScript, Java SDKs| Python, Java, Go SDK|
+------------+--------------------+---------------------+----------------------+---------------------+
| License    | Apache 2.0 (OSS)   | Closed Source / SaaS| BSD-3-Clause (OSS)   | Apache 2.0 (OSS)    |
+------------+--------------------+---------------------+----------------------+---------------------+
"""
    print(matrix)


def main():
    display_syntax_comparison()
    run_live_local_benchmark()
    display_architectural_matrix()


if __name__ == "__main__":
    main()
