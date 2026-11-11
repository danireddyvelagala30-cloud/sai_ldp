from typing import Dict, List, Any
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage

from src.config import Config


class ChatSessionHistory(BaseChatMessageHistory):
    def __init__(self):
        self._messages: List[BaseMessage] = []

    @property
    def messages(self) -> List[BaseMessage]:
        return self._messages

    def add_message(self, message: BaseMessage) -> None:
        self._messages.append(message)

    def clear(self) -> None:
        self._messages.clear()


class SessionMemoryManager:
    def __init__(self, max_history_per_session: int = Config.MAX_CONVERSATION_HISTORY):
        self._sessions: Dict[str, ChatSessionHistory] = {}
        self.max_history = max_history_per_session

    def get_session_history(self, session_id: str) -> ChatSessionHistory:
        if session_id not in self._sessions:
            self._sessions[session_id] = ChatSessionHistory()

        history = self._sessions[session_id]

        if len(history.messages) > self.max_history:
            recent_messages = history.messages[-self.max_history:]
            history.clear()
            for msg in recent_messages:
                history.add_message(msg)

        return history

    def add_user_message(self, session_id: str, content: str):
        history = self.get_session_history(session_id)
        history.add_user_message(content)

    def add_ai_message(self, session_id: str, content: str):
        history = self.get_session_history(session_id)
        history.add_ai_message(content)

    def clear_session(self, session_id: str) -> bool:
        if session_id in self._sessions:
            self._sessions[session_id].clear()
            return True
        return False

    def list_sessions(self) -> List[str]:
        return list(self._sessions.keys())

    def get_messages(self, session_id: str) -> List[BaseMessage]:
        return self.get_session_history(session_id).messages

    def get_formatted_transcript(self, session_id: str) -> List[Dict[str, str]]:
        messages = self.get_messages(session_id)
        transcript = []
        for msg in messages:
            if isinstance(msg, HumanMessage):
                role = "user"
            elif isinstance(msg, AIMessage):
                role = "assistant"
            elif isinstance(msg, SystemMessage):
                role = "system"
            else:
                role = msg.type
            transcript.append({"role": role, "content": msg.content})
        return transcript


default_memory_manager = SessionMemoryManager()
