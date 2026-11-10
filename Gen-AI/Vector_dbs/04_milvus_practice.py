import os
import shutil
import random
from pymilvus import MilvusClient, DataType


def separator(title: str):
    print("\n" + "=" * 70)
    print(f" {title.upper()}")
    print("=" * 70)


def main():
    separator("1. Milvus Client Initialization (Milvus Lite)")
    
    db_file = "./milvus_practice.db"
    if os.path.exists(db_file):
        if os.path.isdir(db_file):
            shutil.rmtree(db_file)
        else:
            os.remove(db_file)
        
    client = MilvusClient(uri=db_file)
    print(f"MilvusClient connected successfully using Milvus Lite at '{db_file}'")

    separator("2. Collection Creation & Index Specification")
    
    collection_name = "genai_articles"
    vector_dim = 4
    
    if client.has_collection(collection_name=collection_name):
        client.drop_collection(collection_name=collection_name)

    client.create_collection(
        collection_name=collection_name,
        dimension=vector_dim,
        metric_type="COSINE",
        auto_id=False
    )
    print(f"Collection '{collection_name}' created:")
    print(f" - Dimension: {vector_dim}")
    print(f" - Metric Type: COSINE")

    separator("3. Ingestion: Vectors & Rich Scalar Metadata")
    
    sample_entities = [
        {
            "id": 1,
            "vector": [0.92, 0.15, 0.85, 0.90],
            "title": "Milvus Vector Architecture",
            "category": "database",
            "year": 2024,
            "rating": 4.9,
            "tags": ["distributed", "gpu", "scalable"]
        },
        {
            "id": 2,
            "vector": [0.88, 0.10, 0.95, 0.40],
            "title": "ChromaDB Lightweight Prototyping",
            "category": "database",
            "year": 2023,
            "rating": 4.6,
            "tags": ["local", "python", "embedded"]
        },
        {
            "id": 3,
            "vector": [0.85, 0.20, 0.10, 0.95],
            "title": "Pinecone Serverless Vector Search",
            "category": "database",
            "year": 2024,
            "rating": 4.8,
            "tags": ["managed", "serverless", "cloud"]
        },
        {
            "id": 4,
            "vector": [0.15, 0.96, 0.20, 0.90],
            "title": "GPT-4 & Gemini Deep Dive",
            "category": "llm",
            "year": 2024,
            "rating": 4.9,
            "tags": ["transformers", "multimodal"]
        },
        {
            "id": 5,
            "vector": [0.70, 0.75, 0.80, 0.65],
            "title": "End-to-End RAG Systems with LangChain",
            "category": "rag",
            "year": 2024,
            "rating": 4.7,
            "tags": ["rag", "orchestration", "search"]
        },
        {
            "id": 6,
            "vector": [0.05, 0.10, 0.90, 0.30],
            "title": "Legacy Statistical Models",
            "category": "classic_ml",
            "year": 2019,
            "rating": 3.8,
            "tags": ["scikit", "legacy"]
        }
    ]

    insert_result = client.insert(
        collection_name=collection_name,
        data=sample_entities
    )
    print(f"Insert Result: Ingested {insert_result['insert_count']} records.")

    separator("4. Vector Similarity Search (ANN - Approximate Nearest Neighbors)")
    
    query_vector = [0.90, 0.10, 0.80, 0.90]
    print(f"Query Vector: {query_vector} (Searching for high enterprise DB affinity)")
    
    search_results = client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=3,
        output_fields=["title", "category", "year", "rating"]
    )

    print("\nTop 3 Approximate Nearest Neighbors:")
    for hit in search_results[0]:
        entity = hit["entity"]
        score = hit["distance"]
        print(f" -> ID: {hit['id']} | Cosine Similarity: {score:.4f}")
        print(f"    Title: '{entity['title']}' | Category: {entity['category']} | Year: {entity['year']}")

    separator("5. Filtered Vector Search (Metadata Filtering with Boolean Expressions)")
    
    filter_expr = 'category == "database" and rating >= 4.7'
    print(f"Search with Metadata Expression: '{filter_expr}'")
    
    filtered_search = client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=5,
        filter=filter_expr,
        output_fields=["title", "category", "rating", "year"]
    )

    print("\nFiltered Search Results:")
    for hit in filtered_search[0]:
        entity = hit["entity"]
        print(f" -> ID: {hit['id']} | Score: {hit['distance']:.4f} | Title: '{entity['title']}' (Rating: {entity['rating']})")

    separator("6. Pure Scalar Querying (Query without Vector)")
    
    scalar_query_res = client.query(
        collection_name=collection_name,
        filter='year >= 2024',
        output_fields=["id", "title", "year", "category"]
    )
    print(f"Found {len(scalar_query_res)} articles published in 2024 or later:")
    for doc in scalar_query_res:
        print(f" -> [{doc['id']}] {doc['title']} ({doc['category']}, {doc['year']})")

    separator("7. CRUD Lifecycle: Get, Upsert, and Delete")
    
    print("\n--- 7.1: Get entity by ID 1 ---")
    fetched = client.get(
        collection_name=collection_name,
        ids=[1],
        output_fields=["title", "rating", "category"]
    )
    print("Fetched entity:", fetched)

    print("\n--- 7.2: Upsert entity with ID 2 (update rating & year) ---")
    client.upsert(
        collection_name=collection_name,
        data=[{
            "id": 2,
            "vector": [0.89, 0.12, 0.95, 0.45],
            "title": "ChromaDB Lightweight Prototyping (2nd Edition)",
            "category": "database",
            "year": 2025,
            "rating": 5.0,
            "tags": ["local", "python", "embedded", "updated"]
        }]
    )
    updated_entity = client.get(collection_name=collection_name, ids=[2], output_fields=["title", "rating", "year"])
    print("After upsert, entity ID 2:", updated_entity)

    print("\n--- 7.3: Delete entity with ID 6 ---")
    client.delete(collection_name=collection_name, ids=[6])
    remaining = client.query(collection_name=collection_name, filter="id > 0")
    print(f"Remaining records count: {len(remaining)}")

    print("\n--- 7.4: Delete by expression ('year < 2020') ---")
    client.delete(collection_name=collection_name, filter="year < 2020")
    
    print("\n[SUCCESS] Milvus practice script completed all steps!")


if __name__ == "__main__":
    main()
