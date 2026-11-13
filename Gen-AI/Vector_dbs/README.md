# Vector Databases Practice & Research Guide
### ChromaDB • Pinecone • Weaviate • Milvus

This repository provides hands-on practice code and in-depth research covering the four primary vector databases used in Generative AI, Retrieval-Augmented Generation (RAG), and similarity search.

---

## 📂 Repository Contents

| File | Database / Topic | Key Features Covered |
| :--- | :--- | :--- |
| **[`01_chromadb_practice.py`](file:///c:/Users/srini/Desktop/Python_GenAI/Vector_dbs/01_chromadb_practice.py)** | **ChromaDB** | In-Memory & Persistent client, auto-embedding with ONNX, Cosine/L2 spaces, metadata filtering (`$and`, `$gte`), full CRUD (`get`, `update`, `upsert`, `delete`). |
| **[`02_pinecone_practice.py`](file:///c:/Users/srini/Desktop/Python_GenAI/Vector_dbs/02_pinecone_practice.py)** | **Pinecone** | Serverless index provisioning (`ServerlessSpec`), namespaces, batch upserts, top-k ANN search with metadata filtering, fetch/update/delete operations, and offline dual-mode simulator. |
| **[`03_weaviate_practice.py`](file:///c:/Users/srini/Desktop/Python_GenAI/Vector_dbs/03_weaviate_practice.py)** | **Weaviate (v4)** | Modern v4 Collections API, typed properties, HNSW index config, dynamic batching, **Hybrid Search** with Reciprocal Rank Fusion (`alpha=0.5`), and Pythonic Boolean filters. |
| **[`04_milvus_practice.py`](file:///c:/Users/srini/Desktop/Python_GenAI/Vector_dbs/04_milvus_practice.py)** | **Milvus (Milvus Lite)** | Zero-Docker embedded local database (`./milvus_practice.db`), AUTOINDEX/HNSW, multi-metric setup, boolean scalar filter expressions (`expr`), scalar queries, and CRUD. |
| **[`05_unified_comparison_matrix.py`](file:///c:/Users/srini/Desktop/Python_GenAI/Vector_dbs/05_unified_comparison_matrix.py)** | **Cross-DB Matrix & Benchmark** | Side-by-side syntax cheatsheet, automated latency benchmark (ChromaDB vs Milvus Lite), and architectural decision guide. |
| **[`requirements.txt`](file:///c:/Users/srini/Desktop/Python_GenAI/Vector_dbs/requirements.txt)** | **Dependencies** | Complete locked dependencies for Python 3.14+ virtual environment. |

---

## 🔬 Core Vector Database Research Topics

### 1. Distance & Similarity Metrics

| Metric | Mathematical Formula | Range | Best For |
| :--- | :--- | :--- | :--- |
| **Cosine Similarity** | $\frac{A \cdot B}{\|A\| \|B\|}$ | $[-1, 1]$ (or $[0, 2]$ for distance) | Text embeddings, semantic similarity where vector length may vary. |
| **Euclidean (L2) Distance** | $\sqrt{\sum (A_i - B_i)^2}$ | $[0, \infty)$ | Computer vision, spatial embeddings, unnormalized coordinates. |
| **Dot Product (Inner Product)** | $\sum A_i B_i$ | $(-\infty, \infty)$ | Normalized vectors (where $\|A\| = 1$), recommendation systems, highest speed. |

> **Note**: For unit-normalized vectors ($\|A\| = 1$), Cosine Similarity and Dot Product are mathematically equivalent:
> $\text{Cosine}(A, B) = A \cdot B$.

---

### 2. Approximate Nearest Neighbor (ANN) Indexing Algorithms

1. **HNSW (Hierarchical Navigable Small World)**:
   - Multi-layer graph where top layers have long links (fast coarse search) and bottom layers have dense links (fine search).
   - High query speed and top recall, but requires high RAM.
   - *Supported by: ChromaDB, Weaviate, Milvus, Pinecone.*
2. **IVF-FLAT (Inverted File Flat)**:
   - Partitions vector space into Voronoi cells using k-means clustering. At query time, only searches vectors in the closest centroids (`nprobe`).
   - Faster index build time and lower memory than HNSW, moderate recall.
   - *Supported by: Milvus, Faiss.*
3. **DiskANN / Vamana**:
   - Graph-based index optimized for SSD storage, allowing billions of vectors with a fraction of RAM.
   - *Supported by: Milvus.*

---

### 3. Metadata Filtering Strategies

When querying vectors with constraints (e.g., `category == "ai" AND year >= 2024`):
- **Pre-Filtering (Single-Stage Filtering)**: The index filters candidate vector IDs *before* graph traversal. Ensures accurate top-k results matching the criteria. (Weaviate, Milvus, ChromaDB, and Pinecone all implement single-stage or inverted index pre-filtering).
- **Post-Filtering**: Retrieves top-k nearest neighbors first, then discards non-matching items. (Can result in fewer than $k$ results or empty matches if the query is restrictive).

---

### 4. Hybrid Search & Reciprocal Rank Fusion (RRF)

Dense vector search is great for semantic intent, but can fail on exact keyword lookups (e.g., product SKUs, serial numbers, specific names). Hybrid search fuses:
- **Dense Vector Search** (e.g. embeddings via HNSW)
- **Sparse Lexical Search** (e.g. BM25 / SPLADE)

Weaviate and Milvus support hybrid search natively using **RRF (Reciprocal Rank Fusion)** or alpha-weighted scoring:
$$\text{Score} = (1 - \alpha) \cdot \text{BM25} + \alpha \cdot \text{DenseVector}$$
- $\alpha = 0.0$: Pure keyword search
- $\alpha = 0.5$: Equal balance of semantic and keyword
- $\alpha = 1.0$: Pure vector similarity search

---

## 📊 Comprehensive Vector Database Comparison

| Dimension | ChromaDB | Pinecone | Weaviate | Milvus |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Deployment** | Embedded / In-Process / Local | Cloud-Managed Serverless | Self-hosted Docker / K8s / WCD Cloud | Milvus Lite (local file) / Distributed K8s |
| **Ease of Setup** | ⭐⭐⭐⭐⭐ (Single `pip install`) | ⭐⭐⭐⭐⭐ (Cloud API key) | ⭐⭐⭐⭐ (Docker / Cloud Sandbox) | ⭐⭐⭐⭐⭐ (Milvus Lite embedded) |
| **Scale Target** | 10k - 1M vectors | 1M - 100M+ vectors | 1M - 100M+ vectors | 10M - 1B+ vectors |
| **Native Hybrid Search** | Requires manual fusion | Supported via Sparse-Dense | Native 1st class (BM25 + Dense RRF) | Native multi-vector & RRF ranker |
| **Best Use Case** | Local RAG prototypes, desktop apps, unit tests | Production serverless apps with zero DevOps | Knowledge graphs, complex schemas, multi-tenant RAG | Enterprise-scale, petabyte-level, distributed clusters |

---

## 🚀 Quickstart: Running the Practice Code

The repository includes a ready-to-run virtual environment:

### 1. Activate Environment

```powershell
# In PowerShell (Windows)
.\.venv\Scripts\Activate.ps1
```

### 2. Run Individual Practice Modules

```powershell
# 1. ChromaDB (Local embedded & persistent)
python 01_chromadb_practice.py

# 2. Pinecone (Serverless & offline interactive demo)
python 02_pinecone_practice.py

# 3. Weaviate (v4 Collections API & Hybrid search)
python 03_weaviate_practice.py

# 4. Milvus (Milvus Lite local embedded SQLite)
python 04_milvus_practice.py

# 5. Unified Comparison & Live Benchmark
python 05_unified_comparison_matrix.py
```

### 3. Optional: Connecting to Cloud Services

- **Pinecone Cloud**:
  ```powershell
  $env:PINECONE_API_KEY="your-pinecone-api-key"
  python 02_pinecone_practice.py
  ```
- **Weaviate Cloud (WCD)**:
  ```powershell
  $env:WEAVIATE_URL="https://your-cluster-url.weaviate.network"
  $env:WEAVIATE_API_KEY="your-wcd-api-key"
  python 03_weaviate_practice.py
  ```
