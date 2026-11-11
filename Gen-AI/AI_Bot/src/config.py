import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BASE_DIR / ".env"

if ENV_FILE.exists():
    load_dotenv(dotenv_path=ENV_FILE)
else:
    load_dotenv()


class Config:
    DEFAULT_PROVIDER = os.getenv("LLM_PROVIDER", "auto").lower()
    
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "") or os.getenv("GOOGLE_API_KEY", "")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    
    TEMPERATURE = float(os.getenv("AGENT_TEMPERATURE", "0.2"))
    MAX_ITERATIONS = int(os.getenv("AGENT_MAX_ITERATIONS", "10"))
    MAX_EXECUTION_TIME = int(os.getenv("AGENT_MAX_EXECUTION_TIME", "30"))
    
    DEFAULT_SESSION_ID = os.getenv("DEFAULT_SESSION_ID", "default_session")
    MAX_CONVERSATION_HISTORY = int(os.getenv("MAX_CONVERSATION_HISTORY", "20"))
    
    @classmethod
    def get_effective_provider(cls, requested_provider: str = None) -> str:
        provider = (requested_provider or cls.DEFAULT_PROVIDER).lower()
        
        if provider == "gemini":
            if cls.GEMINI_API_KEY:
                return "gemini"
            return "mock"
        elif provider == "openai":
            if cls.OPENAI_API_KEY:
                return "openai"
            return "mock"
        elif provider == "mock":
            return "mock"
        else:
            if cls.GEMINI_API_KEY:
                return "gemini"
            elif cls.OPENAI_API_KEY:
                return "openai"
            else:
                return "mock"
