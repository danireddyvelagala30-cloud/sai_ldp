import streamlit as st
import json
from datetime import datetime

from src.config import Config
from src.agent import ConversationalAgent
from src.tools import get_all_tools


st.set_page_config(
    page_title="Conversational AI Bot | LangChain Agents & Tools",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.markdown("""
<style>
    .main-header {
        background: linear-gradient(135deg, #1e1e2f 0%, #2d2b55 100%);
        padding: 24px;
        border-radius: 12px;
        color: white;
        margin-bottom: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    .badge-provider {
        background-color: #6366f1;
        color: white;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.82rem;
        font-weight: 600;
        display: inline-block;
        margin-right: 8px;
    }
    .badge-tools {
        background-color: #10b981;
        color: white;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.82rem;
        font-weight: 600;
        display: inline-block;
    }
    .tool-box {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 8px;
        font-family: monospace;
        font-size: 0.88rem;
    }
</style>
""", unsafe_allow_html=True)


if "memory_initialized" not in st.session_state:
    st.session_state.current_session_id = Config.DEFAULT_SESSION_ID
    st.session_state.sessions_list = [Config.DEFAULT_SESSION_ID]
    st.session_state.chat_records = {Config.DEFAULT_SESSION_ID: []}
    st.session_state.memory_initialized = True

if "provider_override" not in st.session_state:
    st.session_state.provider_override = "auto"


@st.cache_resource
def get_chatbot_agent():
    return ConversationalAgent()

agent = get_chatbot_agent()


with st.sidebar:
    st.title("⚙️ Control Panel")
    
    st.markdown("### 🧠 LLM Provider")
    provider_options = ["auto", "gemini", "openai", "mock"]
    selected_provider = st.selectbox(
        "Select Active Provider:",
        options=provider_options,
        index=provider_options.index(st.session_state.provider_override),
        help="'auto' automatically selects Gemini/OpenAI if API keys exist, otherwise runs offline deterministic ReAct."
    )
    if selected_provider != st.session_state.provider_override:
        st.session_state.provider_override = selected_provider
        agent.provider_setting = selected_provider

    effective = agent.effective_provider
    st.caption(f"Active Engine: **{effective.upper()}**")

    with st.expander("🔑 Configure API Keys (Optional)"):
        st.caption("Keys entered here override `.env` for this browser session.")
        gemini_input = st.text_input("Gemini API Key", value=Config.GEMINI_API_KEY, type="password")
        openai_input = st.text_input("OpenAI API Key", value=Config.OPENAI_API_KEY, type="password")
        if st.button("Save Keys to Runtime", use_container_width=True):
            if gemini_input:
                Config.GEMINI_API_KEY = gemini_input
            if openai_input:
                Config.OPENAI_API_KEY = openai_input
            st.success("API keys updated!")

    st.markdown("---")
    st.markdown("### 💬 Session Management")
    
    current_sess = st.selectbox(
        "Active Chat Session:",
        options=st.session_state.sessions_list,
        index=st.session_state.sessions_list.index(st.session_state.current_session_id)
    )
    st.session_state.current_session_id = current_sess

    new_sess_name = st.text_input("Create New Session Name:", placeholder="e.g. order_inquiry_2")
    if st.button("➕ Start New Session", use_container_width=True):
        clean_name = new_sess_name.strip()
        if clean_name and clean_name not in st.session_state.sessions_list:
            st.session_state.sessions_list.append(clean_name)
            st.session_state.chat_records[clean_name] = []
            st.session_state.current_session_id = clean_name
            st.rerun()

    if st.button("🗑️ Clear Current History", use_container_width=True):
        agent.clear_session(st.session_state.current_session_id)
        st.session_state.chat_records[st.session_state.current_session_id] = []
        st.rerun()

    st.markdown("---")
    st.markdown("### 🛠️ Registered Agent Tools")
    with st.expander(f"View Tools Catalog ({len(get_all_tools())})"):
        for t in get_all_tools():
            st.markdown(f"**`{t.name}`**")
            st.caption(t.description.strip().splitlines()[0])


active_session = st.session_state.current_session_id
records = st.session_state.chat_records.get(active_session, [])

st.markdown(f"""
<div class="main-header">
    <h1 style="margin: 0; font-size: 1.8rem;">🤖 Conversational Chatbot (LangChain Agents & Tools)</h1>
    <p style="margin: 6px 0 12px 0; opacity: 0.85;">Resource - 2: Multi-turn conversational memory, autonomous tool routing & ReAct reasoning loop.</p>
    <div>
        <span class="badge-provider">ENGINE: {agent.effective_provider.upper()}</span>
        <span class="badge-tools">TOOLS: 6 ACTIVE</span>
        <span style="opacity: 0.75; font-size: 0.85rem; margin-left: 8px;">Session: <b>{active_session}</b></span>
    </div>
</div>
""", unsafe_allow_html=True)


st.markdown("##### ⚡ Quick Prompt Suggestions:")
col1, col2, col3, col4, col5 = st.columns(5)

prompt_to_send = None
if col1.button("🧮 45 * 18 + sqrt(144)", use_container_width=True):
    prompt_to_send = "What is 45 * 18 + sqrt(144)?"
if col2.button("📅 Current UTC Time", use_container_width=True):
    prompt_to_send = "What is the current date and time in UTC?"
if col3.button("📦 Track Order ORD-1001", use_container_width=True):
    prompt_to_send = "Can you check the shipping status for order ORD-1001?"
if col4.button("🔄 100 USD to INR", use_container_width=True):
    prompt_to_send = "Convert 100 USD to INR"
if col5.button("📜 Store Return Policy", use_container_width=True):
    prompt_to_send = "What is your store's return policy?"


for item in records:
    with st.chat_message(item["role"]):
        if item["role"] == "assistant":
            if item.get("thoughts") and item["thoughts"] != "Answered directly from contextual reasoning without tool calls.":
                with st.expander("🤔 Agent Thoughts & ReAct Trace"):
                    st.markdown(f"```text\n{item['thoughts']}\n```")
            
            if item.get("tool_calls"):
                with st.expander(f"🛠️ Tool Invocations ({len(item['tool_calls'])})"):
                    for tc in item["tool_calls"]:
                        st.markdown(f"""
                        <div class="tool-box">
                            <b>Tool:</b> {tc['tool']}<br/>
                            <b>Input:</b> {tc['input']}<br/>
                            <b>Output:</b> {tc['output']}
                        </div>
                        """, unsafe_allow_html=True)
                        
        st.markdown(item["content"])


user_query = st.chat_input("Type your message or ask a question...")
final_query = prompt_to_send or user_query

if final_query:
    with st.chat_message("user"):
        st.markdown(final_query)

    with st.chat_message("assistant"):
        with st.spinner("Agent reasoning & routing tools..."):
            response = agent.chat(final_query, session_id=active_session)

        if response.thoughts and response.thoughts != "Answered directly from contextual reasoning without tool calls.":
            with st.expander("🤔 Agent Thoughts & ReAct Trace"):
                st.markdown(f"```text\n{response.thoughts}\n```")

        if response.tool_calls:
            with st.expander(f"🛠️ Tool Invocations ({len(response.tool_calls)})"):
                for tc in response.tool_calls:
                    st.markdown(f"""
                    <div class="tool-box">
                        <b>Tool:</b> {tc['tool']}<br/>
                        <b>Input:</b> {tc['input']}<br/>
                        <b>Output:</b> {tc['output']}
                    </div>
                    """, unsafe_allow_html=True)

        st.markdown(response.final_answer)

    records.append({
        "role": "user",
        "content": final_query,
        "timestamp": datetime.now().isoformat(),
    })
    records.append({
        "role": "assistant",
        "content": response.final_answer,
        "thoughts": response.thoughts,
        "tool_calls": response.tool_calls,
        "timestamp": datetime.now().isoformat(),
    })
    st.session_state.chat_records[active_session] = records
