import os
import sys
import numpy as np
from typing import Dict, Any, List

try:
    import weaviate
    from weaviate.classes.config import Configure, Property, DataType, VectorDistances
    from weaviate.classes.query import Filter, MetadataQuery
except ImportError:
    print("Please install weaviate client: pip install weaviate-client")
    sys.exit(1)


def separator(title: str):
    print("\n" + "=" * 70)
    print(f" {title.upper()}")
    print("=" * 70)


def run_live_weaviate(client: weaviate.WeaviateClient):
    separator("1. Weaviate v4 Client Connected")
    print(f"Connected to Weaviate. Is Ready: {client.is_ready()}")

    collection_name = "GenAIArticles"
    
    separator("2. Creating Collection with v4 Typed Schema")
    if client.collections.exists(collection_name):
        client.collections.delete(collection_name)
        print(f"Deleted existing collection '{collection_name}'.")

    articles_col = client.collections.create(
        name=collection_name,
        vectorizer_config=Configure.Vectorizer.none(),
        vector_index_config=Configure.VectorIndex.hnsw(
            distance_metric=VectorDistances.COSINE
        ),
        properties=[
            Property(name="title", data_type=DataType.TEXT),
            Property(name="content", data_type=DataType.TEXT),
            Property(name="category", data_type=DataType.TEXT),
            Property(name="year", data_type=DataType.INT),
            Property(name="rating", data_type=DataType.NUMBER),
            Property(name="is_open_source", data_type=DataType.BOOL)
        ]
    )
    print(f"Collection '{collection_name}' created successfully with HNSW Cosine index.")

    separator("3. Ingesting Data Objects with Vectors")
    sample_data = [
        {
            "properties": {
                "title": "Weaviate Hybrid Search Deep Dive",
                "content": "Weaviate blends dense vectors with BM25 lexical ranking using Reciprocal Rank Fusion.",
                "category": "database",
                "year": 2024,
                "rating": 4.9,
                "is_open_source": True
            },
            "vector": [0.91, 0.20, 0.85, 0.88]
        },
        {
            "properties": {
                "title": "ChromaDB Embedded Storage",
                "content": "ChromaDB provides local developer-friendly vector operations inside Python applications.",
                "category": "database",
                "year": 2023,
                "rating": 4.5,
                "is_open_source": True
            },
            "vector": [0.85, 0.12, 0.90, 0.40]
        },
        {
            "properties": {
                "title": "Transformer Attention Mechanisms",
                "content": "Multi-head self-attention enables Large Language Models to contextualize word tokens.",
                "category": "llm",
                "year": 2024,
                "rating": 4.8,
                "is_open_source": False
            },
            "vector": [0.10, 0.95, 0.20, 0.85]
        }
    ]

    inserted_uuids = []
    with articles_col.batch.dynamic() as batch:
        for item in sample_data:
            uuid = batch.add_object(
                properties=item["properties"],
                vector=item["vector"]
            )
            inserted_uuids.append(uuid)

    print(f"Batch inserted {len(sample_data)} objects into '{collection_name}'.")

    separator("4. Semantic Search (Near Vector)")
    query_vector = [0.90, 0.15, 0.80, 0.85]
    print(f"Query Vector: {query_vector}")

    near_vector_response = articles_col.query.near_vector(
        near_vector=query_vector,
        limit=2,
        return_metadata=MetadataQuery(distance=True)
    )

    print("\nNear Vector Top Matches:")
    for obj in near_vector_response.objects:
        dist = obj.metadata.distance
        print(f" -> Title: '{obj.properties['title']}' | Cosine Distance: {dist:.4f}")
        print(f"    Category: {obj.properties['category']} | Rating: {obj.properties['rating']}")

    separator("5. Hybrid Search (Dense Vectors + BM25 Keywords)")
    print("Executing Hybrid Search with alpha=0.5 (keywords: 'dense vectors', vector supplied):")
    hybrid_response = articles_col.query.hybrid(
        query="dense vectors",
        vector=query_vector,
        alpha=0.5,
        limit=2,
        return_metadata=MetadataQuery(score=True)
    )

    for obj in hybrid_response.objects:
        print(f" -> Title: '{obj.properties['title']}' | Combined Score: {obj.metadata.score}")

    separator("6. Metadata Filtering with v4 Filter Objects")
    filter_expr = (
        Filter.by_property("category").equal("database") &
        Filter.by_property("year").greater_or_equal(2024)
    )
    
    filtered_results = articles_col.query.fetch_objects(
        filters=filter_expr,
        limit=5
    )

    print("\nFiltered Objects (category == 'database' and year >= 2024):")
    for obj in filtered_results.objects:
        print(f" -> {obj.properties['title']} (Year: {obj.properties['year']})")

    separator("7. CRUD Lifecycle")
    first_uuid = inserted_uuids[0] if inserted_uuids else None
    if first_uuid:
        obj = articles_col.query.fetch_object_by_id(first_uuid)
        print("Fetched object title:", obj.properties["title"])

        articles_col.data.update(
            uuid=first_uuid,
            properties={"rating": 5.0}
        )
        print(f"Updated rating for object {first_uuid} to 5.0")


def run_dryrun_simulation():
    print(">>> WEAVIATE v4 ARCHITECTURAL WALKTHROUGH & SIMULATION <<<")
    
    separator("1. Connecting in Weaviate v4")
    print('''
    import weaviate
    from weaviate.classes.init import Auth

    client = weaviate.connect_to_local(
        host="localhost",
        port=8080,
        grpc_port=50051
    )

    client = weaviate.connect_to_weaviate_cloud(
        cluster_url="https://your-cluster-id.weaviate.network",
        auth_credentials=Auth.api_key("your-wcd-api-key")
    )
    ''')

    separator("2. Defining Schema with Collections API")
    print('''
    from weaviate.classes.config import Configure, Property, DataType, VectorDistances

    articles = client.collections.create(
        name="Articles",
        vectorizer_config=Configure.Vectorizer.none(),
        vector_index_config=Configure.VectorIndex.hnsw(
            distance_metric=VectorDistances.COSINE
        ),
        properties=[
            Property(name="title", data_type=DataType.TEXT),
            Property(name="content", data_type=DataType.TEXT),
            Property(name="category", data_type=DataType.TEXT),
            Property(name="views", data_type=DataType.INT)
        ]
    )
    ''')

    separator("3. Ingestion & Dynamic Batching")
    print('''
    with articles.batch.dynamic() as batch:
        batch.add_object(
            properties={
                "title": "Weaviate v4 Architecture",
                "content": "High-performance gRPC communication and collections API.",
                "category": "database",
                "views": 1500
            },
            vector=[0.88, 0.15, 0.90, 0.85]
        )
    ''')

    separator("4. Hybrid Search Explained (Reciprocal Rank Fusion)")
    print('''
    response = articles.query.hybrid(
        query="vector database architecture",
        vector=[0.88, 0.15, 0.90, 0.85],
        alpha=0.5,
        limit=3
    )

    for obj in response.objects:
        print(obj.properties["title"])
    ''')

    separator("5. Complex Filtering with v4 Filter Syntax")
    print('''
    from weaviate.classes.query import Filter

    results = articles.query.fetch_objects(
        filters=(
            Filter.by_property("category").equal("database") &
            Filter.by_property("views").greater_than(1000)
        ),
        limit=5
    )
    ''')


def main():
    weaviate_url = os.getenv("WEAVIATE_URL")
    weaviate_key = os.getenv("WEAVIATE_API_KEY")

    if weaviate_url and weaviate_key:
        try:
            from weaviate.classes.init import Auth
            client = weaviate.connect_to_weaviate_cloud(
                cluster_url=weaviate_url,
                auth_credentials=Auth.api_key(weaviate_key)
            )
            with client:
                run_live_weaviate(client)
            return
        except Exception as e:
            print(f"[NOTE] Could not connect to Weaviate Cloud ({e}). Falling back to simulation.")

    try:
        client = weaviate.connect_to_local(port=8080, grpc_port=50051)
        if client.is_ready():
            with client:
                run_live_weaviate(client)
            return
    except Exception:
        pass

    run_dryrun_simulation()


if __name__ == "__main__":
    main()
