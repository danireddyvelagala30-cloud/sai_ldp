from typing import List, Dict
from langchain_core.tools import BaseTool

from src.tools.calculator import calculator_tool
from src.tools.datetime_tool import get_current_datetime_tool
from src.tools.wikipedia_tool import wikipedia_search_tool
from src.tools.customer_db import lookup_customer_order_tool, search_store_policy_tool
from src.tools.unit_converter import unit_converter_tool


def get_all_tools() -> List[BaseTool]:
    return [
        calculator_tool,
        get_current_datetime_tool,
        wikipedia_search_tool,
        lookup_customer_order_tool,
        search_store_policy_tool,
        unit_converter_tool,
    ]


def get_tools_map() -> Dict[str, BaseTool]:
    return {tool.name: tool for tool in get_all_tools()}


__all__ = [
    "get_all_tools",
    "get_tools_map",
    "calculator_tool",
    "get_current_datetime_tool",
    "wikipedia_search_tool",
    "lookup_customer_order_tool",
    "search_store_policy_tool",
    "unit_converter_tool",
]
