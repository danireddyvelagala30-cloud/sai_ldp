import unittest
from src.tools.calculator import calculator_tool, evaluate_math_expression
from src.tools.datetime_tool import get_current_datetime_tool
from src.tools.wikipedia_tool import wikipedia_search_tool
from src.tools.customer_db import lookup_customer_order_tool, search_store_policy_tool
from src.tools.unit_converter import unit_converter_tool
from src.memory.session_memory import SessionMemoryManager
from src.agent.conversational_agent import ConversationalAgent


class TestChatbotTools(unittest.TestCase):
    def test_calculator_tool_basic(self):
        res = calculator_tool.invoke({"expression": "25 * 4 + 10"})
        self.assertEqual(res, "110")

    def test_calculator_tool_functions(self):
        res = calculator_tool.invoke({"expression": "sqrt(144) + 2^3"})
        self.assertEqual(res, "20")

    def test_calculator_zero_division(self):
        res = calculator_tool.invoke({"expression": "100 / 0"})
        self.assertIn("Error: Division by zero", res)

    def test_datetime_tool(self):
        res = get_current_datetime_tool.invoke({"timezone_name": "UTC"})
        self.assertIn("Current Date:", res)
        self.assertIn("Current Time:", res)
        self.assertIn("Timezone:", res)

    def test_customer_order_lookup_success(self):
        res = lookup_customer_order_tool.invoke({"order_id": "ORD-1001"})
        self.assertIn("Srini", res)
        self.assertIn("MacBook Pro", res)
        self.assertIn("Out for Delivery", res)

    def test_customer_order_lookup_not_found(self):
        res = lookup_customer_order_tool.invoke({"order_id": "ORD-9999"})
        self.assertIn("was not found", res)

    def test_store_policy_tool(self):
        res = search_store_policy_tool.invoke({"topic": "returns"})
        self.assertIn("return window is 30 days", res)

    def test_unit_converter_temperature(self):
        res = unit_converter_tool.invoke({"value": 100, "from_unit": "celsius", "to_unit": "fahrenheit"})
        self.assertIn("212.00 Fahrenheit", res)

    def test_unit_converter_currency(self):
        res = unit_converter_tool.invoke({"value": 100, "from_unit": "USD", "to_unit": "INR"})
        self.assertIn("INR", res)


class TestSessionMemory(unittest.TestCase):
    def setUp(self):
        self.memory = SessionMemoryManager(max_history_per_session=10)

    def test_session_isolation(self):
        self.memory.add_user_message("session_alpha", "Hello from Alpha")
        self.memory.add_ai_message("session_alpha", "Hi Alpha user!")
        
        self.memory.add_user_message("session_beta", "Hello from Beta")
        
        alpha_history = self.memory.get_formatted_transcript("session_alpha")
        beta_history = self.memory.get_formatted_transcript("session_beta")
        
        self.assertEqual(len(alpha_history), 2)
        self.assertEqual(len(beta_history), 1)
        self.assertEqual(alpha_history[0]["content"], "Hello from Alpha")
        self.assertEqual(beta_history[0]["content"], "Hello from Beta")

    def test_clear_session(self):
        self.memory.add_user_message("session_test", "Test message")
        self.assertEqual(len(self.memory.get_formatted_transcript("session_test")), 1)
        
        self.memory.clear_session("session_test")
        self.assertEqual(len(self.memory.get_formatted_transcript("session_test")), 0)


class TestConversationalAgentEndToEnd(unittest.TestCase):
    def setUp(self):
        self.memory = SessionMemoryManager()
        self.agent = ConversationalAgent(provider="mock", memory_manager=self.memory)

    def test_greeting_turn(self):
        response = self.agent.chat("Hello!", session_id="test_session_1")
        self.assertIn("Conversational Assistant", response.final_answer)
        self.assertEqual(response.session_id, "test_session_1")

    def test_tool_execution_math(self):
        response = self.agent.chat("What is 125 * 8?", session_id="test_session_math")
        self.assertIn("1000", response.final_answer)
        self.assertEqual(len(response.tool_calls), 1)
        self.assertEqual(response.tool_calls[0]["tool"], "calculator_tool")
        self.assertEqual(response.tool_calls[0]["output"], "1000")

    def test_tool_execution_order_tracking(self):
        response = self.agent.chat("Can you track order ORD-1001 for me?", session_id="test_session_order")
        self.assertIn("Srini", response.final_answer)
        self.assertIn("ORD-1001", response.final_answer)
        self.assertEqual(len(response.tool_calls), 1)
        self.assertEqual(response.tool_calls[0]["tool"], "lookup_customer_order_tool")

    def test_conversational_memory_across_turns(self):
        session_id = "test_memory_recall"
        resp1 = self.agent.chat("Hi, my name is Srini.", session_id=session_id)
        self.assertIn("Srini", resp1.final_answer)
        
        resp2 = self.agent.chat("Do you remember what my name is?", session_id=session_id)
        self.assertIn("Srini", resp2.final_answer)

    def test_conversational_followup_on_order(self):
        session_id = "test_order_context"
        self.agent.chat("I placed order ORD-1002 yesterday.", session_id=session_id)
        resp2 = self.agent.chat("Where is my order being delivered?", session_id=session_id)
        self.assertIn("ORD-1002", resp2.final_answer)
        self.assertIn("Seattle", resp2.final_answer)


if __name__ == "__main__":
    unittest.main()
