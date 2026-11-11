from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import json

from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage,
    ToolMessage,
    BaseMessage,
)

from src.config import Config
from src.tools import get_all_tools, get_tools_map
from src.memory.session_memory import SessionMemoryManager, default_memory_manager
from src.agent.prompt import SYSTEM_PROMPT
from src.agent.agent_builder import get_model_with_tools
from src.agent.mock_agent import MockReActAgent


@dataclass
class AgentResponse:
    user_input: str
    final_answer: str
    thoughts: str = ""
    tool_calls: List[Dict[str, Any]] = field(default_factory=list)
    session_id: str = Config.DEFAULT_SESSION_ID
    provider: str = "mock"


class ConversationalAgent:
    def __init__(
        self,
        provider: Optional[str] = None,
        memory_manager: Optional[SessionMemoryManager] = None,
    ):
        self.provider_setting = provider or Config.DEFAULT_PROVIDER
        self.memory = memory_manager or default_memory_manager
        self.tools = get_all_tools()
        self.tools_map = get_tools_map()
        self.mock_agent = MockReActAgent()

    @property
    def effective_provider(self) -> str:
        return Config.get_effective_provider(self.provider_setting)

    def chat(self, user_input: str, session_id: str = Config.DEFAULT_SESSION_ID) -> AgentResponse:
        clean_input = user_input.strip()
        if not clean_input:
            return AgentResponse(
                user_input=user_input,
                final_answer="Please provide a query or message.",
                session_id=session_id,
                provider=self.effective_provider,
            )

        active_provider = self.effective_provider

        if active_provider in ("gemini", "openai"):
            try:
                return self._execute_live_llm(clean_input, session_id, active_provider)
            except Exception as exc:
                fallback_resp = self._execute_mock(clean_input, session_id)
                fallback_resp.thoughts = f"[Live LLM Note: {str(exc)} - Switched to Fallback Agent]\n" + fallback_resp.thoughts
                return fallback_resp
        else:
            return self._execute_mock(clean_input, session_id)

    def _execute_live_llm(self, user_input: str, session_id: str, provider_name: str) -> AgentResponse:
        model_with_tools = get_model_with_tools(provider_name, self.tools)
        if model_with_tools is None:
            return self._execute_mock(user_input, session_id)

        history = self.memory.get_session_history(session_id)
        
        messages: List[BaseMessage] = [SystemMessage(content=SYSTEM_PROMPT)]
        messages.extend(history.messages)
        messages.append(HumanMessage(content=user_input))

        response_msg = model_with_tools.invoke(messages)
        tool_calls_record = []
        thoughts_list = []

        if hasattr(response_msg, "tool_calls") and response_msg.tool_calls:
            messages.append(response_msg)
            
            for call in response_msg.tool_calls:
                tool_name = call.get("name")
                tool_args = call.get("args", {})
                call_id = call.get("id", f"call_{tool_name}")
                
                thoughts_list.append(f"Model decided to call tool '{tool_name}' with arguments: {tool_args}")

                if tool_name in self.tools_map:
                    tool_instance = self.tools_map[tool_name]
                    try:
                        tool_output = tool_instance.invoke(tool_args)
                    except Exception as err:
                        tool_output = f"Error executing {tool_name}: {str(err)}"
                else:
                    tool_output = f"Tool '{tool_name}' is not registered."

                tool_calls_record.append({
                    "tool": tool_name,
                    "input": tool_args,
                    "output": str(tool_output)
                })

                messages.append(ToolMessage(
                    content=str(tool_output),
                    tool_call_id=call_id,
                    name=tool_name
                ))

            final_response = model_with_tools.invoke(messages)
            final_answer = final_response.content
        else:
            final_answer = response_msg.content

        self.memory.add_user_message(session_id, user_input)
        self.memory.add_ai_message(session_id, str(final_answer))

        return AgentResponse(
            user_input=user_input,
            final_answer=str(final_answer),
            thoughts="\n".join(thoughts_list) if thoughts_list else "Answered directly from contextual reasoning without tool calls.",
            tool_calls=tool_calls_record,
            session_id=session_id,
            provider=provider_name,
        )

    def _execute_mock(self, user_input: str, session_id: str) -> AgentResponse:
        history_transcript = self.memory.get_formatted_transcript(session_id)
        chat_history_text = "\n".join([f"{item['role'].capitalize()}: {item['content']}" for item in history_transcript])

        result = self.mock_agent.step(user_input, chat_history_text)
        
        self.memory.add_user_message(session_id, user_input)
        self.memory.add_ai_message(session_id, result["final_answer"])

        return AgentResponse(
            user_input=user_input,
            final_answer=result["final_answer"],
            thoughts=result["thoughts"],
            tool_calls=result["tool_calls"],
            session_id=session_id,
            provider="mock (Deterministic ReAct)",
        )

    def clear_session(self, session_id: str = Config.DEFAULT_SESSION_ID) -> bool:
        return self.memory.clear_session(session_id)

    def list_sessions(self) -> List[str]:
        return self.memory.list_sessions()

    def get_transcript(self, session_id: str = Config.DEFAULT_SESSION_ID) -> List[Dict[str, str]]:
        return self.memory.get_formatted_transcript(session_id)
