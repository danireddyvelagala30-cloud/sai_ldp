import ast
import math
import operator
from langchain_core.tools import tool

_ALLOWED_OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.FloorDiv: operator.floordiv,
    ast.Mod: operator.mod,
    ast.Pow: operator.pow,
    ast.USub: operator.neg,
    ast.UAdd: operator.pos,
}

_ALLOWED_FUNCTIONS = {
    "sqrt": math.sqrt,
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "log": math.log,
    "log10": math.log10,
    "exp": math.exp,
    "abs": abs,
    "round": round,
    "ceil": math.ceil,
    "floor": math.floor,
}

_ALLOWED_CONSTANTS = {
    "pi": math.pi,
    "e": math.e,
}


def _safe_eval(node):
    if isinstance(node, ast.Expression):
        return _safe_eval(node.body)
    elif isinstance(node, ast.Constant):
        if isinstance(node.value, (int, float)):
            return node.value
        raise ValueError(f"Unsupported constant type: {type(node.value)}")
    elif isinstance(node, ast.BinOp):
        left = _safe_eval(node.left)
        right = _safe_eval(node.right)
        op_type = type(node.op)
        if op_type in _ALLOWED_OPERATORS:
            return _ALLOWED_OPERATORS[op_type](left, right)
        raise ValueError(f"Unsupported binary operator: {op_type.__name__}")
    elif isinstance(node, ast.UnaryOp):
        operand = _safe_eval(node.operand)
        op_type = type(node.op)
        if op_type in _ALLOWED_OPERATORS:
            return _ALLOWED_OPERATORS[op_type](operand)
        raise ValueError(f"Unsupported unary operator: {op_type.__name__}")
    elif isinstance(node, ast.Call):
        func_name = node.func.id if isinstance(node.func, ast.Name) else None
        if func_name and func_name in _ALLOWED_FUNCTIONS:
            args = [_safe_eval(arg) for arg in node.args]
            return _ALLOWED_FUNCTIONS[func_name](*args)
        raise ValueError(f"Unsupported function call: {func_name}")
    elif isinstance(node, ast.Name):
        if node.id in _ALLOWED_CONSTANTS:
            return _ALLOWED_CONSTANTS[node.id]
        raise ValueError(f"Unsupported variable name: {node.id}")
    else:
        raise ValueError(f"Unsupported expression node: {type(node).__name__}")


def evaluate_math_expression(expression: str) -> str:
    try:
        clean_expr = expression.strip().replace("^", "**")
        parsed = ast.parse(clean_expr, mode="eval")
        result = _safe_eval(parsed)
        if isinstance(result, float) and result.is_integer():
            result = int(result)
        elif isinstance(result, float):
            result = round(result, 6)
        return str(result)
    except ZeroDivisionError:
        return "Error: Division by zero."
    except Exception as exc:
        return f"Error evaluating expression '{expression}': {str(exc)}"


@tool
def calculator_tool(expression: str) -> str:
    """
    Useful for calculating mathematical and arithmetic expressions.
    Use this tool whenever you need to compute numbers, percentages, sums,
    multiplications, square roots, or formulas.
    Input must be a valid mathematical expression string, e.g. '125 * 45',
    '(1000 * 0.15) + 50', 'sqrt(144) + 2^3'.
    """
    return evaluate_math_expression(expression)
