import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "data"
FINANCIAL_DIR = DATA_DIR / "financial_reports"
BLOGS_DIR = DATA_DIR / "blog_posts"
PRESS_RELEASES_DIR = DATA_DIR / "press_releases"

STORAGE_DIR = BASE_DIR / "storage"
STORAGE_DIR.mkdir(parents=True, exist_ok=True)
MILVUS_URI = os.getenv("MILVUS_URI", str(STORAGE_DIR / "milvus_business_rag.db"))
MILVUS_COLLECTION_NAME = os.getenv("MILVUS_COLLECTION", "nvidia_business_knowledge")

EMBEDDING_MODEL_NAME = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en-v1.5")
EMBEDDING_DIM = int(os.getenv("EMBEDDING_DIM", "384"))

CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "650"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "100"))

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "auto")
