class InsufficientFundsError(Exception):
    def __init__(self, requested: float, available: float) -> None:
        super().__init__(
            f"Cannot withdraw ${requested:.2f}. Available balance: ${available:.2f}"
        )
        self.requested = requested
        self.available = available


def parse_integer_safe(raw_value: str, default: int = 0) -> int:
    try:
        return int(raw_value)
    except ValueError:
        return default


def safe_divide(numerator: float, denominator: float) -> float | None:
    try:
        result = numerator / denominator
    except ZeroDivisionError:
        return None
    else:
        return round(result, 4)
