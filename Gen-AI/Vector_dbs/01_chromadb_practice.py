import os
import shutil
import chromadb
from chromadb.config import Settings


def separator(title: str):
    print("\n" + "=" * 70)
    print(f" {title.upper()}")
    print("=" * 70)


def main():
    separator("1. Client Setup: In-Memory vs Persistent Storage")
    
    mem_client = chromadb.Client()
    print("In-Memory Client initialized successfully.")

    persist_dir = "./chroma_db_data"
    if os.path.exists(persist_dir):
        shutil.rmtree(persist_dir)
        
    persistent_client = chromadb.PersistentClient(path=persist_dir)
    print(f"Persistent Client initialized at path: '{persist_dir}'")

    separator("2. Collection Creation & Distance Metrics")
    
    collection_name = "genai_knowledge_base"
    collection = persistent_client.create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"}
    )
    print(f"Collection '{collection.name}' created with metric: 'cosine'")

    separator("3. Data Ingestion: Documents, Metadata & Embeddings")
    
    sample_docs = [
        "Vector databases specialize in storing and retrieving high-dimensional embeddings efficiently.",
        "Large Language Models like GPT-4, Claude, and Gemini use attention mechanisms to generate text.",
        "Retrieval-Augmented Generation (RAG) grounds language models with private company data.",
        "Convolutional Neural Networks (CNNs) were widely popular for computer vision tasks.",
        "Milvus and Weaviate are distributed vector databases designed for billion-scale deployments.",
        "Pinecone is a managed cloud-native serverless vector database.",
        "ChromaDB is a lightweight embedded vector database ideal for rapid local prototyping."
    ]

    sample_ids = [f"doc_{i+1}" for i in range(len(sample_docs))]

    sample_metadata = [
        {"category": "database", "year": 2024, "rating": 4.8, "open_source": True},
        {"category": "llm", "year": 2023, "rating": 4.9, "open_source": False},
        {"category": "rag", "year": 2024, "rating": 4.7, "open_source": True},
        {"category": "vision", "year": 2018, "rating": 4.2, "open_source": True},
        {"category": "database", "year": 2023, "rating": 4.6, "open_source": True},
        {"category": "database", "year": 2024, "rating": 4.8, "open_source": False},
        {"category": "database", "year": 2024, "rating": 4.9, "open_source": True},
    ]

    print(f"Ingesting {len(sample_docs)} documents into collection...")
    collection.add(
        documents=sample_docs,
        ids=sample_ids,
        metadatas=sample_metadata
    )
    print(f"Ingestion complete. Total items in collection: {collection.count()}")

    separator("4. Semantic Similarity Search (ANN / k-NN)")
    
    query_text = "What vector database can I use locally for quick Python prototypes?"
    print(f"Query: '{query_text}'")
    
    results = collection.query(
        query_texts=[query_text],
        n_results=3,
        include=["documents", "metadatas", "distances"]
    )

    print("\nTop 3 Matches:")
    for idx, (doc, meta, dist) in enumerate(zip(
        results["documents"][0], 
        results["metadatas"][0], 
        results["distances"][0]
    ), start=1):
        similarity_score = 1.0 - dist
        print(f" [{idx}] Similarity: {similarity_score:.4f} | Distance: {dist:.4f}")
        print(f"     Doc: {doc}")
        print(f"     Metadata: {meta}\n")

    separator("5. Filtered Vector Search (Metadata Filtering)")
    
    filter_condition = {
        "$and": [
            {"category": {"$eq": "database"}},
            {"year": {"$gte": 2024}},
            {"open_source": {"$eq": True}}
        ]
    }
    
    filtered_query = "Cloud or local vector data storage"
    print(f"Query: '{filtered_query}'")
    print(f"Filter Expression: {filter_condition}")
    
    filtered_results = collection.query(
        query_texts=[filtered_query],
        n_results=5,
        where=filter_condition
    )

    print("\nFiltered Results:")
    for doc, meta in zip(filtered_results["documents"][0], filtered_results["metadatas"][0]):
        print(f" -> [{meta['category']} | Year: {meta['year']} | OpenSource: {meta['open_source']}]")
        print(f"    {doc}")

    separator("6. CRUD Operations: Get, Update, Upsert, Delete")
    
    print("\n--- 6.1: Fetch by ID (doc_1) ---")
    item = collection.get(ids=["doc_1"], include=["documents", "metadatas"])
    print("Fetched item:", item)

    print("\n--- 6.2: Update metadata & document for doc_1 ---")
    collection.update(
        ids=["doc_1"],
        documents=["Vector databases store high-dimensional embeddings and support hybrid search."],
        metadatas=[{"category": "database", "year": 2025, "rating": 5.0, "open_source": True}]
    )
    updated_item = collection.get(ids=["doc_1"])
    print("Updated doc_1 metadata:", updated_item["metadatas"])

    print("\n--- 6.3: Upsert (doc_8: new record) ---")
    collection.upsert(
        ids=["doc_8"],
        documents=["Graph vector databases combine semantic relationships with vector proximity."],
        metadatas=[{"category": "graph_vector", "year": 2025, "rating": 4.5, "open_source": True}]
    )
    print(f"Total count after upsert: {collection.count()}")

    print("\n--- 6.4: Delete record doc_4 ---")
    collection.delete(ids=["doc_4"])
    print(f"Total count after deleting doc_4: {collection.count()}")

    print("\n--- 6.5: Delete by metadata filter (year < 2020) ---")
    collection.delete(where={"year": {"$lt": 2020}})
    print(f"Remaining items count: {collection.count()}")

    separator("7. Custom Embeddings Practice (BYO Vectors)")
    
    custom_col = persistent_client.get_or_create_collection(
        name="custom_vectors_demo",
        metadata={"hnsw:space": "l2"}
    )
    
    custom_vectors = [
        [1.0, 0.0, 0.0],
        [0.9, 0.1, 0.0],
        [0.0, 1.0, 0.0],
    ]
    custom_ids = ["vec_x", "vec_near_x", "vec_y"]
    custom_metas = [{"label": "pure_x"}, {"label": "near_x"}, {"label": "pure_y"}]

    custom_col.add(
        embeddings=custom_vectors,
        ids=custom_ids,
        metadatas=custom_metas
    )

    query_vec = [0.95, 0.05, 0.0]
    custom_res = custom_col.query(
        query_embeddings=[query_vec],
        n_results=2
    )
    print(f"Query Vector: {query_vec}")
    print("Nearest IDs:", custom_res["ids"][0])
    print("L2 Distances:", custom_res["distances"][0])

    print("\n[SUCCESS] ChromaDB practice script completed all steps!")


if __name__ == "__main__":
    main()
