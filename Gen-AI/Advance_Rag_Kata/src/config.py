import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
STORAGE_DIR = BASE_DIR / "storage"

DATA_DIR.mkdir(parents=True, exist_ok=True)
STORAGE_DIR.mkdir(parents=True, exist_ok=True)

MILVUS_DB_PATH = str(STORAGE_DIR / "milvus_adv_rag.db")
CHAT_DB_PATH = str(STORAGE_DIR / "chat_history.db")
CACHE_DB_PATH = str(STORAGE_DIR / "query_cache.db")

MILVUS_COLLECTION_NAME = "multi_company_intelligence"
EMBEDDING_MODEL_NAME = "BAAI/bge-small-en-v1.5"
EMBEDDING_DIM = 384
DISTANCE_METRIC = "COSINE"

def get_partition_name(company_name: str) -> str:
    cleaned = "".join(c.lower() if c.isalnum() else "_" for c in company_name.strip())
    while "__" in cleaned:
        cleaned = cleaned.replace("__", "_")
    cleaned = cleaned.strip("_")
    return f"company_{cleaned}"

def extract_company_from_partition(partition_name: str) -> str:
    if partition_name.startswith("company_"):
        return partition_name[len("company_"):].replace("_", " ").title()
    return partition_name

EXACT_CACHE_ENABLED = True
SEMANTIC_CACHE_ENABLED = True
SEMANTIC_CACHE_THRESHOLD = 0.82
CACHE_TTL_SECONDS = 86400
MAX_MEMORY_CACHE_SIZE = 500

CHAT_CONTEXT_WINDOW = 6
MAX_SUB_QUERIES = 4
DEFAULT_TOP_K = 4

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
