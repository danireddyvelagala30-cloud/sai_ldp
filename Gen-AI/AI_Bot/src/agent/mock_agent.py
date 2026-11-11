import re
from typing import Dict, Any, List
from src.tools import get_tools_map


class MockReActAgent:
    def __init__(self):
        self.tools_map = get_tools_map()

    def step(self, user_input: str, chat_history_text: str) -> Dict[str, Any]:
        query = user_input.strip()
        lowered = query.lower()
        tool_calls = []
        thoughts = []

        math_keywords = ["calculate", "compute", "what is", "multiply", "divide", "add", "subtract", "+", "*", "/", "^", "sqrt"]
        has_math_intent = any(k in lowered for k in math_keywords) and any(c.isdigit() for c in query)
        
        if has_math_intent and not any(k in lowered for k in ["ord-", "order", "usd", "eur", "celsius", "km"]):
            expr = query
            for prefix in ["calculate", "compute", "what is", "evaluate", "solve", ":"]:
                if prefix in lowered:
                    idx = lowered.find(prefix) + len(prefix)
                    expr = query[idx:].strip()
                    break
            expr = expr.rstrip("?").strip()
            
            thoughts.append(f"The user is asking for a mathematical calculation. I need to invoke calculator_tool with expression '{expr}'.")
            calc_tool = self.tools_map["calculator_tool"]
            output = calc_tool.invoke({"expression": expr})
            tool_calls.append({"tool": "calculator_tool", "input": expr, "output": str(output)})
            final_answer = f"According to calculation for `{expr}`, the result is **{output}**."
            return {"thoughts": "\n".join(thoughts), "tool_calls": tool_calls, "final_answer": final_answer}

        if any(w in lowered for w in ["what time", "what day", "current date", "today's date", "current year", "what's the time"]):
            thoughts.append("User requested current date or time. Invoking get_current_datetime_tool.")
            dt_tool = self.tools_map["get_current_datetime_tool"]
            output = dt_tool.invoke({"timezone_name": "UTC"})
            tool_calls.append({"tool": "get_current_datetime_tool", "input": "UTC", "output": str(output)})
            final_answer = f"Here is the current temporal information:\n\n{output}"
            return {"thoughts": "\n".join(thoughts), "tool_calls": tool_calls, "final_answer": final_answer}

        order_match = re.search(r"\b(ORD-\d{4})\b", query, re.IGNORECASE)
        if not order_match and "order" in lowered:
            history_order_match = re.search(r"\b(ORD-\d{4})\b", chat_history_text, re.IGNORECASE)
            if history_order_match:
                order_match = history_order_match

        if "name" in lowered and order_match and any(w in lowered for w in ["remember", "recall", "what", "who"]):
            name_match = re.search(r"(?:my name is|i am called|call me|i'm)\s+([A-Z][a-z]+)", chat_history_text, re.IGNORECASE)
            user_name = name_match.group(1) if name_match else "a valued customer"
            order_id = order_match.group(1).upper()
            thoughts.append(f"User requested recall of both their name and their previous order '{order_id}'. Calling lookup_customer_order_tool.")
            order_tool = self.tools_map["lookup_customer_order_tool"]
            output = order_tool.invoke({"order_id": order_id})
            tool_calls.append({"tool": "lookup_customer_order_tool", "input": order_id, "output": str(output)})
            final_answer = (
                f"Yes, I certainly remember! Your name is **{user_name}**, and you asked about order **{order_id}**.\n\n"
                f"{output}"
            )
            return {"thoughts": "\n".join(thoughts), "tool_calls": tool_calls, "final_answer": final_answer}

        if order_match or ("order" in lowered and any(k in lowered for k in ["track", "status", "where is", "delivery"])):
            order_id = order_match.group(1).upper() if order_match else "ORD-1001"
            thoughts.append(f"Identified customer order query for ID '{order_id}'. Calling lookup_customer_order_tool.")
            order_tool = self.tools_map["lookup_customer_order_tool"]
            output = order_tool.invoke({"order_id": order_id})
            tool_calls.append({"tool": "lookup_customer_order_tool", "input": order_id, "output": str(output)})
            final_answer = f"I retrieved the tracking details for order **{order_id}**:\n\n{output}"
            return {"thoughts": "\n".join(thoughts), "tool_calls": tool_calls, "final_answer": final_answer}

        policy_topics = ["return", "refund", "shipping", "warranty"]
        matched_policy = next((p for p in policy_topics if p in lowered), None)
        if matched_policy:
            thoughts.append(f"User asked about store policy on '{matched_policy}'. Invoking search_store_policy_tool.")
            policy_tool = self.tools_map["search_store_policy_tool"]
            output = policy_tool.invoke({"topic": matched_policy})
            tool_calls.append({"tool": "search_store_policy_tool", "input": matched_policy, "output": str(output)})
            final_answer = f"{output}"
            return {"thoughts": "\n".join(thoughts), "tool_calls": tool_calls, "final_answer": final_answer}

        if any(w in lowered for w in ["convert", "to celsius", "to fahrenheit", "to inr", "to usd", "to miles", "to km"]):
            thoughts.append("User requested a unit or currency conversion. Invoking unit_converter_tool.")
            val_match = re.search(r"(\d+(?:\.\d+)?)", query)
            val = float(val_match.group(1)) if val_match else 100.0
            
            from_u = "celsius"
            to_u = "fahrenheit"
            if "fahrenheit to celsius" in lowered or ("fahrenheit" in lowered and "celsius" in lowered and lowered.index("fahrenheit") < lowered.index("celsius")):
                from_u, to_u = "fahrenheit", "celsius"
            elif "celsius to fahrenheit" in lowered:
                from_u, to_u = "celsius", "fahrenheit"
            elif "usd to inr" in lowered:
                from_u, to_u = "USD", "INR"
            elif "inr to usd" in lowered:
                from_u, to_u = "INR", "USD"
            elif "miles to km" in lowered or "miles to kilometer" in lowered:
                from_u, to_u = "miles", "km"
            elif "km to miles" in lowered or "kilometer to miles" in lowered:
                from_u, to_u = "km", "miles"

            conv_tool = self.tools_map["unit_converter_tool"]
            output = conv_tool.invoke({"value": val, "from_unit": from_u, "to_unit": to_u})
            tool_calls.append({"tool": "unit_converter_tool", "input": f"{val} {from_u} -> {to_u}", "output": str(output)})
            final_answer = f"Conversion Result:\n**{output}**"
            return {"thoughts": "\n".join(thoughts), "tool_calls": tool_calls, "final_answer": final_answer}

        if any(w in lowered for w in ["who is", "who was", "what is", "tell me about", "wikipedia", "explain"]) and not any(k in lowered for k in ["my name", "you", "your name"]):
            wiki_topic = query
            for prefix in ["who is", "who was", "what is", "tell me about", "wikipedia", "explain", "search for"]:
                if prefix in lowered:
                    idx = lowered.find(prefix) + len(prefix)
                    wiki_topic = query[idx:].strip()
                    break
            wiki_topic = wiki_topic.rstrip("?").strip()
            
            thoughts.append(f"User is asking for encyclopedic factual information about '{wiki_topic}'. Invoking wikipedia_search_tool.")
            wiki_tool = self.tools_map["wikipedia_search_tool"]
            output = wiki_tool.invoke({"query": wiki_topic})
            tool_calls.append({"tool": "wikipedia_search_tool", "input": wiki_topic, "output": str(output)})
            final_answer = f"Here is what I found regarding **{wiki_topic}**:\n\n{output}"
            return {"thoughts": "\n".join(thoughts), "tool_calls": tool_calls, "final_answer": final_answer}

        if ("my name" in lowered and any(k in lowered for k in ["what", "remember", "know", "tell", "recall", "repeat"])) or "who am i" in lowered:
            thoughts.append("User is checking conversational memory for their name.")
            name_match = re.search(r"(?:my name is|i am called|call me|i'm)\s+([A-Z][a-z]+)", chat_history_text, re.IGNORECASE)
            if not name_match:
                name_match = re.search(r"Name:\s*([A-Z][a-z]+)", chat_history_text, re.IGNORECASE)
            if name_match:
                name = name_match.group(1)
                final_answer = f"Yes, you mentioned earlier that your name is **{name}**!"
            else:
                final_answer = "You haven't told me your name yet in this session. What should I call you?"
            return {"thoughts": "\n".join(thoughts), "tool_calls": [], "final_answer": final_answer}

        intro_match = re.search(r"(?:my name is|i am|call me)\s+([A-Z][a-z]+)", query, re.IGNORECASE)
        if intro_match:
            name = intro_match.group(1)
            thoughts.append(f"User introduced their name as '{name}'. Storing into conversational memory.")
            final_answer = f"Nice to meet you, **{name}**! I've noted your name in our session memory. How can I assist you with math, dates, order tracking, conversions, or research today?"
            return {"thoughts": "\n".join(thoughts), "tool_calls": [], "final_answer": final_answer}

        if any(g in lowered for g in ["hi", "hello", "hey", "greetings", "good morning", "good evening"]):
            thoughts.append("User greeted the bot. Responding politely and introducing capabilities.")
            final_answer = (
                "Hello! I am your AI Conversational Assistant powered by LangChain Agents and Tools.\n\n"
                "I can help you with:\n"
                "- 🧮 **Calculations**: Arithmetic, percentages, formulas (`calculator_tool`)\n"
                "- 📅 **Live Date & Time**: Current dates and timezones (`get_current_datetime_tool`)\n"
                "- 📦 **Order Tracking**: Customer order status and courier tracking (`lookup_customer_order_tool`)\n"
                "- 📜 **Store Policies**: Returns, refunds, warranties (`search_store_policy_tool`)\n"
                "- 🔄 **Unit Conversions**: Temperature, distances, weights, currencies (`unit_converter_tool`)\n"
                "- 🌐 **Encyclopedic Search**: Verified facts & Wikipedia summaries (`wikipedia_search_tool`)\n"
                "- 🧠 **Conversational Memory**: I remember our previous turns throughout our chat session!\n\n"
                "How can I help you today?"
            )
            return {"thoughts": "\n".join(thoughts), "tool_calls": [], "final_answer": final_answer}

        thoughts.append("No specific tool required. Providing conversational response.")
        final_answer = (
            f"I understood your message: '{query}'. "
            "Feel free to ask me to calculate equations, check live dates/times, track orders (e.g. ORD-1001), "
            "convert units/currencies, or search facts on Wikipedia!"
        )
        return {"thoughts": "\n".join(thoughts), "tool_calls": [], "final_answer": final_answer}
