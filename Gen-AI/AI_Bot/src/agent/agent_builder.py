from typing import Optional, List, Any
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.tools import BaseTool

from src.config import Config
from src.tools import get_all_tools


def create_chat_model(provider: Optional[str] = None) -> Optional[BaseChatModel]:
    effective_provider = Config.get_effective_provider(provider)

    if effective_provider == "gemini":
        from langchain_google_genai import ChatGoogleGenerativeAI
        return ChatGoogleGenerativeAI(
            model=Config.GEMINI_MODEL,
            google_api_key=Config.GEMINI_API_KEY,
            temperature=Config.TEMPERATURE,
            convert_system_message_to_human=True,
        )

    elif effective_provider == "openai":
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            model=Config.OPENAI_MODEL,
            api_key=Config.OPENAI_API_KEY,
            temperature=Config.TEMPERATURE,
        )

    return None


def get_model_with_tools(
    provider: Optional[str] = None,
    tools: Optional[List[BaseTool]] = None
) -> Any:
    model = create_chat_model(provider)
    if model is None:
        return None
        
    tool_list = tools or get_all_tools()
    return model.bind_tools(tool_list)
