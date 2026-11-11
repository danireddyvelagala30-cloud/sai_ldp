import sys
import argparse

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from src.config import Config
from src.agent import ConversationalAgent
from src.tools import get_all_tools


def print_banner():
    print("=" * 76)
    print("  🤖 LANGCHAIN CONVERSATIONAL CHATBOT (AGENTS & TOOLS - RESOURCE 2)")
    print("=" * 76)
    print("  Features:")
    print("    • Multi-turn conversational memory with isolated session contexts")
    print("    • Real-time Agent tool routing (Calculator, DateTime, Wikipedia, DB, Units)")
    print("    • Step-by-step ReAct thought & tool execution tracing")
    print("    • Compatible with Google Gemini, OpenAI, and deterministic offline ReAct")
    print("-" * 76)
    print("  Commands:")
    print("    /help              Show this help menu")
    print("    /tools             Inspect registered agent tools")
    print("    /history           Display session conversation transcript")
    print("    /sessions          List active session IDs")
    print("    /switch <id>       Switch to another session ID")
    print("    /clear             Clear current session chat history")
    print("    /demo              Run an automated multi-turn demonstration")
    print("    /exit or /quit     Exit the CLI")
    print("=" * 76)


def run_demo(agent: ConversationalAgent):
    demo_session = "demo_session"
    agent.clear_session(demo_session)
    print("\n🎬 Running Automated Multi-Turn Conversational Demo...\n")

    turns = [
        "Hi! My name is Srini. I want to check some information today.",
        "What is 35 * 14 + sqrt(256)?",
        "Can you check the shipping status for order ORD-1001?",
        "Do you remember my name and which order I just asked about?",
    ]

    for idx, prompt in enumerate(turns, 1):
        print(f"\n👉 [Turn {idx}] User: {prompt}")
        response = agent.chat(prompt, session_id=demo_session)
        
        if response.thoughts:
            print(f"   🤔 Agent Thoughts:\n      {response.thoughts.replace(chr(10), chr(10) + '      ')}")
        
        if response.tool_calls:
            print("   🛠️ Tools Executed:")
            for call in response.tool_calls:
                print(f"      • [{call['tool']}] Input: {call['input']} -> Output: {call['output'][:80]}...")
                
        print(f"   🤖 Assistant:\n      {response.final_answer}\n")
        print("-" * 70)


def main():
    parser = argparse.ArgumentParser(description="Conversational Chatbot with LangChain Agents & Tools")
    parser.add_argument("--provider", choices=["auto", "gemini", "openai", "mock"], default="auto", help="LLM Provider")
    parser.add_argument("--session", default=Config.DEFAULT_SESSION_ID, help="Session ID")
    parser.add_argument("--demo", action="store_true", help="Run automated demo and exit")
    args = parser.parse_args()

    agent = ConversationalAgent(provider=args.provider)
    current_session = args.session

    if args.demo:
        run_demo(agent)
        return

    print_banner()
    print(f"\n[Active Model Provider: {agent.effective_provider.upper()}] | [Active Session: {current_session}]\n")

    while True:
        try:
            user_input = input(f"[{current_session}] User: ").strip()
            if not user_input:
                continue

            cmd_lower = user_input.lower()
            if cmd_lower in ("/exit", "/quit", "exit", "quit"):
                print("\nGoodbye! Have a great day.\n")
                break

            elif cmd_lower in ("/help", "help"):
                print_banner()
                continue

            elif cmd_lower in ("/tools", "tools"):
                tools = get_all_tools()
                print("\n🛠️ Registered Agent Tools:")
                for t in tools:
                    print(f"  • {t.name}: {t.description.strip().splitlines()[0]}")
                print()
                continue

            elif cmd_lower in ("/history", "history"):
                transcript = agent.get_transcript(current_session)
                print(f"\n📜 Transcript for [{current_session}]:")
                if not transcript:
                    print("  (Empty history)")
                for item in transcript:
                    print(f"  [{item['role'].upper()}]: {item['content']}")
                print()
                continue

            elif cmd_lower in ("/sessions", "sessions"):
                sessions = agent.list_sessions()
                print(f"\nActive Sessions: {sessions if sessions else ['(none yet)']}\n")
                continue

            elif cmd_lower.startswith("/switch "):
                new_session = user_input.split(maxsplit=1)[1].strip()
                if new_session:
                    current_session = new_session
                    print(f"\nSwitched active session to: [{current_session}]\n")
                continue

            elif cmd_lower in ("/clear", "clear"):
                agent.clear_session(current_session)
                print(f"\nCleared memory for session: [{current_session}]\n")
                continue

            elif cmd_lower in ("/demo", "demo"):
                run_demo(agent)
                continue

            response = agent.chat(user_input, session_id=current_session)

            if response.thoughts and response.thoughts != "Answered directly from contextual reasoning without tool calls.":
                print(f"\n🤔 Agent Thoughts:\n{response.thoughts}")

            if response.tool_calls:
                print("\n🛠️ Tools Executed:")
                for call in response.tool_calls:
                    print(f"  • Tool: {call['tool']}")
                    print(f"    Input:  {call['input']}")
                    print(f"    Output: {call['output']}")

            print(f"\n🤖 Assistant:\n{response.final_answer}\n")

        except (KeyboardInterrupt, EOFError):
            print("\nSession ended. Exiting.")
            break
        except Exception as err:
            print(f"\n❌ Unexpected error: {err}\n")


if __name__ == "__main__":
    main()
