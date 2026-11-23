import functools
from typing import Generator, List, Dict, Any


def rate_limit(max_calls: int):
    def decorator(func):
        calls = 0
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            nonlocal calls
            if calls >= max_calls:
                raise RuntimeError("Rate limit exceeded")
            calls += 1
            return func(*args, **kwargs)
        return wrapper
    return decorator


def even_squares_generator(n: int) -> Generator[int, None, None]:
    for i in range(0, n + 1, 2):
        yield i ** 2


def process_transactions(transactions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    successful = list(filter(lambda tx: tx.get("status") == "success", transactions))
    with_fee = list(map(lambda tx: {**tx, "effective_fee": round(tx["amount"] * 0.02, 2)}, successful))
    return sorted(with_fee, key=lambda tx: tx["amount"], reverse=True)


def run_tests():
    print("=" * 60)
    print("RUNNING AUTOMATED VERIFICATION TEST SUITE")
    print("=" * 60)

    print("\n[Test 1] Testing Rate Limiter Decorator...")
    @rate_limit(max_calls=2)
    def ping():
        return "pong"

    assert ping() == "pong"
    assert ping() == "pong"
    
    rate_exceeded = False
    try:
        ping()
    except RuntimeError as e:
        if str(e) == "Rate limit exceeded":
            rate_exceeded = True
    assert rate_exceeded
    print("   Exercise 1 Passed")

    print("\n[Test 2] Testing Even-Squares Generator...")
    gen = even_squares_generator(6)
    results = list(gen)
    assert results == [0, 4, 16, 36]
    print("   Exercise 2 Passed")

    print("\n[Test 3] Testing Lambda Transaction Pipeline...")
    txs = [
        {"id": "T1", "amount": 100.0, "status": "success"},
        {"id": "T2", "amount": 500.0, "status": "failed"},
        {"id": "T3", "amount": 250.0, "status": "success"},
        {"id": "T4", "amount": 50.0, "status": "pending"},
    ]
    processed = process_transactions(txs)
    assert len(processed) == 2
    assert processed[0]["id"] == "T3" and processed[0]["amount"] == 250.0
    assert processed[0]["effective_fee"] == 5.0
    assert processed[1]["id"] == "T1" and processed[1]["effective_fee"] == 2.0
    print("   Exercise 3 Passed")

    print("\n" + "=" * 60)
    print(" ALL TESTS PASSED SUCCESSFULLY!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
