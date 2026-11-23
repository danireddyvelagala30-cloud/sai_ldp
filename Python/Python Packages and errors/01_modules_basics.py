import sys
import math
from datetime import datetime, timezone
import os


def demonstrate_import_styles():
    print("\n--- 1. Import Styles ---")
    area = math.pi * (5 ** 2)
    print(f"[Style A] math.pi * 5^2 = {area:.2f}")

    now = datetime.now(timezone.utc)
    print(f"[Style B] Current UTC time: {now.strftime('%Y-%m-%d %H:%M:%S')}")

    import collections as col
    counter = col.Counter(["apple", "banana", "apple", "orange", "apple"])
    print(f"[Style C] Counter with alias: {counter}")


def demonstrate_module_metadata():
    print("\n--- 2. Module Metadata & Introspection ---")
    print(f"Current module __name__: {__name__}")
    print(f"Current module __file__: {__file__}")
    
    print("\nTop 3 sys.path search directories:")
    for idx, path in enumerate(sys.path[:3], start=1):
        print(f"  {idx}. {path}")


__all__ = ["calculate_discount", "demonstrate_import_styles"]


def calculate_discount(price: float, percentage: float) -> float:
    if not (0 <= percentage <= 100):
        raise ValueError("Percentage must be between 0 and 100")
    return price * (1 - percentage / 100)


def _internal_helper():
    return "secret internal logic"


if __name__ == "__main__":
    print("=" * 60)
    print(f"Executing '{__file__}' directly as main script!")
    print("=" * 60)

    demonstrate_import_styles()
    demonstrate_module_metadata()

    print("\n--- 3. Testing Public Function ---")
    original_price = 120.0
    discounted = calculate_discount(original_price, 20)
    print(f"${original_price:.2f} with 20% discount = ${discounted:.2f}")

    print("\n--- Summary ---")
    print("Modules bundle functions and state into reusable single-file namespaces.")
    print("Next step: Check 02_exceptions_deep_dive.py for handling errors properly.")
