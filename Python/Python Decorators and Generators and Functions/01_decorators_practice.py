import time
import functools
from typing import Callable, Any


def part1_foundations():
    print("\n--- Part 1: Functions as First-Class Citizens & Closures ---")
    
    def greet(name: str) -> str:
        return f"Hello, {name}!"

    say_hello = greet
    print(say_hello("Alice"))

    def execute_func(func: Callable[[str], str], arg: str) -> str:
        return func(arg)

    print(execute_func(greet, "Bob"))

    def outer_multiplier(factor: int):
        def inner(number: int) -> int:
            return number * factor
        return inner

    doubler = outer_multiplier(2)
    print(f"Doubler of 10: {doubler(10)}")


def part2_basic_decorator():
    print("\n--- Part 2: Basic Decorator & functools.wraps ---")

    def execution_timer(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            start_time = time.perf_counter()
            result = func(*args, **kwargs)
            elapsed = time.perf_counter() - start_time
            print(f"⏱️  [{func.__name__}] executed in {elapsed:.6f} seconds")
            return result
        return wrapper

    @execution_timer
    def slow_calculation(n: int) -> int:
        return sum(i * i for i in range(n))

    result = slow_calculation(100_000)
    print(f"Result: {result}")
    print(f"Function Name preserved: {slow_calculation.__name__}")


def part3_decorators_with_arguments():
    print("\n--- Part 3: Decorators with Arguments (Decorator Factories) ---")

    def retry(max_attempts: int = 3, delay_seconds: float = 0.2):
        def decorator(func: Callable) -> Callable:
            @functools.wraps(func)
            def wrapper(*args, **kwargs) -> Any:
                attempts = 0
                while attempts < max_attempts:
                    try:
                        return func(*args, **kwargs)
                    except Exception as err:
                        attempts += 1
                        print(f"⚠️  [Attempt {attempts}/{max_attempts}] Failed with: {err}")
                        if attempts >= max_attempts:
                            print(f"❌  All {max_attempts} attempts failed.")
                            raise
                        time.sleep(delay_seconds)
            return wrapper
        return decorator

    call_count = 0

    @retry(max_attempts=3, delay_seconds=0.1)
    def flaky_network_call():
        nonlocal call_count
        call_count += 1
        if call_count < 3:
            raise ConnectionError("Temporary network glitch")
        return "200 OK: Data fetched successfully"

    response = flaky_network_call()
    print(f"Final Outcome: {response}")


def part4_real_world_patterns():
    print("\n--- Part 4: Real-World Decorator Patterns ---")

    current_user = {"username": "srinivasan", "role": "admin", "is_authenticated": True}

    def require_role(required_role: str):
        def decorator(func: Callable) -> Callable:
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                if not current_user.get("is_authenticated"):
                    raise PermissionError("User is not authenticated!")
                if current_user.get("role") != required_role:
                    raise PermissionError(
                        f"Access Denied: Requires role '{required_role}', got '{current_user.get('role')}'"
                    )
                return func(*args, **kwargs)
            return wrapper
        return decorator

    @require_role("admin")
    def delete_database_records():
        return " Database records deleted securely."

    print(delete_database_records())

    def simple_memoize(func: Callable) -> Callable:
        cache = {}
        @functools.wraps(func)
        def wrapper(*args):
            if args not in cache:
                print(f" [Cache Miss] Computing for {args}...")
                cache[args] = func(*args)
            else:
                print(f" [Cache Hit] Returning cached result for {args}...")
            return cache[args]
        return wrapper

    @simple_memoize
    def fibonacci(n: int) -> int:
        if n < 2:
            return n
        return fibonacci(n - 1) + fibonacci(n - 2)

    print(f"Fib(6) = {fibonacci(6)}")
    print(f"Fib(6) again = {fibonacci(6)}")


def part5_class_based_decorators():
    print("\n--- Part 5: Class-Based Decorator ---")

    class CallCounter:
        def __init__(self, func: Callable):
            self.func = func
            self.count = 0
            functools.update_wrapper(self, func)

        def __call__(self, *args, **kwargs):
            self.count += 1
            print(f" Function '{self.func.__name__}' called {self.count} time(s)")
            return self.func(*args, **kwargs)

    @CallCounter
    def send_notification(user_id: int, message: str) -> str:
        return f"Notification sent to {user_id}: {message}"

    send_notification(101, "Welcome!")
    send_notification(102, "Order Shipped")
    send_notification(101, "Password Changed")


def practice_challenges():
    print("\n--- Part 6: Practice Challenges ---")
    
    def audit_logger(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print(f" [AUDIT LOG] Entering '{func.__name__}' with args={args}, kwargs={kwargs}")
            result = func(*args, **kwargs)
            print(f" [AUDIT LOG] Exiting '{func.__name__}' -> returned: {result}")
            return result
        return wrapper

    @audit_logger
    def transfer_funds(sender: str, recipient: str, amount: float):
        return f"Transferred ${amount:.2f} from {sender} to {recipient}"

    transfer_funds("Alice", "Bob", amount=250.75)


if __name__ == "__main__":
    print("=" * 60)
    print("PYTHON DECORATORS PRACTICE SUITE")
    print("=" * 60)
    part1_foundations()
    part2_basic_decorator()
    part3_decorators_with_arguments()
    part4_real_world_patterns()
    part5_class_based_decorators()
    practice_challenges()
