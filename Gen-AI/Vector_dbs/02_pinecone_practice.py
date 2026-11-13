import os
import sys
import time
from typing import Dict, Any, List

try:
    from pinecone import Pinecone, ServerlessSpec
except ImportError:
    print("Please install pinecone client: pip install pinecone")
    sys.exit(1)


def separator(title: str):
    print("\n" + "=" * 70)
    print(f" {title.upper()}")
    print("=" * 70)


def run_live_pinecone(api_key: str):
    print(">>> RUNNING LIVE PINECONE SESSION <<<")
    
    separator("1. Client Setup")
    pc = Pinecone(api_key=api_key)
    print("Pinecone client initialized successfully.")

    separator("2. Index Creation (Serverless)")
    index_name = "genai-practice-index"
    dimension = 4
    metric = "cosine"

    existing_indexes = [idx["name"] for idx in pc.list_indexes()]
    print(f"Existing indexes: {existing_indexes}")

    if index_name not in existing_indexes:
        print(f"Creating new Serverless index '{index_name}' (dim={dimension}, metric={metric})...")
        pc.create_index(
            name=index_name,
            dimension=dimension,
            metric=metric,
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
        print("Waiting for index to be ready...")
        while not pc.describe_index(index_name).status["ready"]:
            time.sleep(2)
        print(f"Index '{index_name}' is ready.")
    else:
        print(f"Index '{index_name}' already exists.")

    index = pc.Index(index_name)

    separator("3. Upsert Vectors with Metadata and Namespaces")
    
    sample_records = [
        {
            "id": "vec_1",
            "values": [0.90, 0.15, 0.85, 0.88],
            "metadata": {
                "title": "Pinecone Architecture Guide",
                "category": "database",
                "year": 2024,
                "rating": 4.9,
                "managed": True
            }
        },
        {
            "id": "vec_2",
            "values": [0.85, 0.10, 0.92, 0.35],
            "metadata": {
                "title": "ChromaDB Local Quickstart",
                "category": "database",
                "year": 2023,
                "rating": 4.5,
                "managed": False
            }
        },
        {
            "id": "vec_3",
            "values": [0.12, 0.95, 0.25, 0.90],
            "metadata": {
                "title": "Generative LLM Prompt Engineering",
                "category": "llm",
                "year": 2024,
                "rating": 4.8,
                "managed": True
            }
        },
        {
            "id": "vec_4",
            "values": [0.72, 0.80, 0.82, 0.60],
            "metadata": {
                "title": "Building RAG with Vector Search",
                "category": "rag",
                "year": 2024,
                "rating": 4.7,
                "managed": True
            }
        }
    ]

    target_namespace = "experiment-2024"
    print(f"Upserting {len(sample_records)} vectors into namespace: '{target_namespace}'...")
    
    upsert_response = index.upsert(
        vectors=sample_records,
        namespace=target_namespace
    )
    print("Upsert response:", upsert_response)
    time.sleep(3)

    separator("4. Vector Similarity Search (ANN)")
    
    query_vector = [0.88, 0.12, 0.80, 0.85]
    print(f"Query Vector: {query_vector}")

    query_res = index.query(
        namespace=target_namespace,
        vector=query_vector,
        top_k=2,
        include_metadata=True,
        include_values=False
    )

    print("\nTop Matches:")
    for match in query_res["matches"]:
        print(f" -> ID: {match['id']} | Score: {match['score']:.4f}")
        print(f"    Metadata: {match['metadata']}")

    separator("5. Filtered Vector Search (Metadata Filtering)")
    
    metadata_filter = {
        "category": {"$eq": "database"},
        "year": {"$gte": 2024}
    }
    print(f"Query with filter: {metadata_filter}")

    filtered_res = index.query(
        namespace=target_namespace,
        vector=query_vector,
        top_k=5,
        filter=metadata_filter,
        include_metadata=True
    )

    print("\nFiltered Results:")
    for match in filtered_res["matches"]:
        print(f" -> ID: {match['id']} | Score: {match['score']:.4f} | Title: {match['metadata']['title']}")

    separator("6. CRUD Operations (Fetch, Update, Stats, Delete)")
    
    print("\n--- 6.1: Fetch by ID ('vec_1') ---")
    fetched = index.fetch(ids=["vec_1"], namespace=target_namespace)
    print("Fetched vector info:", fetched["vectors"].get("vec_1"))

    print("\n--- 6.2: Update Metadata for 'vec_1' ---")
    index.update(
        id="vec_1",
        set_metadata={"rating": 5.0, "reviewed": True},
        namespace=target_namespace
    )
    print("Updated metadata.")

    print("\n--- 6.3: Index Statistics ---")
    stats = index.describe_index_stats()
    print("Index stats:", stats)

    print("\n--- 6.4: Delete vector 'vec_2' ---")
    index.delete(ids=["vec_2"], namespace=target_namespace)
    print("Deleted 'vec_2'.")


def run_dryrun_simulation():
    print(">>> PINECONE SIMULATION & ARCHITECTURAL DEMO <<<")
    
    separator("1. Pinecone Client & Index Architecture")
    print('''
    from pinecone import Pinecone, ServerlessSpec

    pc = Pinecone(api_key="your-pinecone-api-key")

    pc.create_index(
        name="genai-knowledge-base",
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
    ''')

    separator("2. Upsert Format with Namespaces")
    print('''
    index = pc.Index("genai-knowledge-base")

    vectors_to_upsert = [
        {
            "id": "doc_rag_01",
            "values": [0.024, -0.015, 0.089],
            "metadata": {
                "source": "wiki",
                "author": "team_ai",
                "year": 2024,
                "access_level": "public"
            }
        }
    ]

    index.upsert(
        vectors=vectors_to_upsert,
        namespace="engineering-docs"
    )
    ''')

    separator("3. ANN Querying & Metadata Filtering Syntax")
    print('''
    response = index.query(
        namespace="engineering-docs",
        vector=[0.021, -0.018, 0.095],
        top_k=3,
        include_metadata=True,
        filter={
            "year": {"$gte": 2024},
            "access_level": {"$in": ["public", "internal"]}
        }
    )

    {
        "matches": [
            {
                "id": "doc_rag_01",
                "score": 0.9642,
                "values": [],
                "metadata": {"year": 2024, "access_level": "public", "source": "wiki"}
            }
        ],
        "namespace": "engineering-docs",
        "usage": {"read_units": 5}
    }
    ''')

    separator("4. CRUD Operations Summary")
    print('''
    index.fetch(ids=["doc_rag_01"], namespace="engineering-docs")

    index.update(
        id="doc_rag_01",
        set_metadata={"verified": True},
        namespace="engineering-docs"
    )

    index.delete(ids=["doc_rag_01"], namespace="engineering-docs")
    index.delete(filter={"year": {"$lt": 2020}}, namespace="engineering-docs")
    ''')


def main():
    api_key = os.getenv("PINECONE_API_KEY")
    if api_key and api_key.strip():
        run_live_pinecone(api_key)
    else:
        run_dryrun_simulation()


if __name__ == "__main__":
    main()
