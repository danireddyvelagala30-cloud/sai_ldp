import time
from functools import wraps
from typing import Callable


def section_1_functions_vs_methods():
    print("=" * 50)
    print("1. Functions vs Methods")
    print("=" * 50)

    def calculate_tax(amount: float, rate: float = 0.18) -> float:
        return round(amount * rate, 2)

    tax = calculate_tax(100.0)
    print(f"Standalone Function result: tax on 100.0 is {tax}")

    text = "hello fastapi"
    print(f"String Method: '{text}'.upper() -> '{text.upper()}'")

    sample_list = [3, 1, 4]
    sample_list.append(2)
    print(f"List Method: after append(2) -> {sample_list}")
    print()


def section_2_arguments_and_parameters():
    print("=" * 50)
    print("2. Flexible Arguments: *args and **kwargs")
    print("=" * 50)

    def sum_all(*numbers: float) -> float:
        total = 0.0
        for num in numbers:
            total += num
        return total

    print("sum_all(1, 2, 3, 4, 5) ->", sum_all(1, 2, 3, 4, 5))

    def build_user_profile(username: str, **attributes) -> dict:
        profile = {"username": username}
        profile.update(attributes)
        return profile

    user = build_user_profile(
        "srinivas",
        email="srini@example.com",
        role="Developer",
        framework="FastAPI"
    )
    print("build_user_profile result:", user)

    def connect_db(host: str, port: int, *, secure: bool = True):
        return f"Connecting to {host}:{port} (SSL={secure})"

    print(connect_db("localhost", 5432, secure=False))
    print()


def section_3_variable_scope():
    print("=" * 50)
    print("3. Variable Scope (LEGB: Local, Enclosing, Global, Built-in)")
    print("=" * 50)

    global_counter = 100

    def outer_function():
        enclosing_val = "Enclosing scope"

        def inner_function():
            nonlocal enclosing_val
            enclosing_val = "Modified by inner function via nonlocal"
            print("  Inside inner:", enclosing_val)

        inner_function()
        print("  Inside outer:", enclosing_val)

    outer_function()
    print("  Global counter remains untouched:", global_counter)
    print()


def section_4_lambdas_and_higher_order():
    print("=" * 50)
    print("4. Lambda Functions and Built-ins (map, filter, sorted)")
    print("=" * 50)

    square = lambda x: x ** 2
    print("Lambda square(6) ->", square(6))

    nums = [1, 2, 3, 4, 5, 6, 7, 8]

    evens = list(filter(lambda x: x % 2 == 0, nums))
    print(f"Filter evens from {nums} -> {evens}")

    doubled = list(map(lambda x: x * 2, nums))
    print(f"Map doubled -> {doubled}")

    users = [
        {"name": "Charlie", "age": 35},
        {"name": "Alice", "age": 22},
        {"name": "Bob", "age": 28},
    ]
    sorted_by_age = sorted(users, key=lambda u: u["age"])
    print("Sorted users by age:", sorted_by_age)
    print()


def section_5_decorators():
    print("=" * 50)
    print("5. Closures & Decorators (Foundation for FastAPI routes)")
    print("=" * 50)

    def timing_decorator(func: Callable):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            result = func(*args, **kwargs)
            duration = (time.perf_counter() - start) * 1000
            print(f"  [Timing] {func.__name__} took {duration:.4f} ms")
            return result
        return wrapper

    @timing_decorator
    def heavy_calculation(n: int) -> int:
        return sum(i * i for i in range(n))

    total = heavy_calculation(50_000)
    print(f"Result: {total}\n")


def section_6_practice_exercises():
    print("=" * 50)
    print("6. Practice Exercises & Solutions")
    print("=" * 50)

    def is_palindrome(s: str) -> bool:
        cleaned = "".join(ch.lower() for ch in s if ch.isalnum())
        return cleaned == cleaned[::-1]

    assert is_palindrome("Racecar") is True
    assert is_palindrome("A man a plan a canal Panama") is True
    assert is_palindrome("FastAPI") is False
    print("Challenge 1 (Palindrome checker): PASSED")

    def make_multiplier(factor: int) -> Callable[[int], int]:
        def multiplier(x: int) -> int:
            return x * factor
        return multiplier

    times_three = make_multiplier(3)
    times_ten = make_multiplier(10)
    assert times_three(5) == 15
    assert times_ten(5) == 50
    print("Challenge 2 (Function Factory / Closure): PASSED")

    def build_query_url(base_url: str, *path_segments: str, **params) -> str:
        path = "/".join(str(p).strip("/") for p in path_segments)
        full_url = f"{base_url.rstrip('/')}/{path}" if path else base_url.rstrip('/')
        if params:
            query = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
            return f"{full_url}?{query}"
        return full_url

    url = build_query_url(
        "https://api.example.com",
        "v1", "users",
        limit=10,
        sort="desc"
    )
    assert url == "https://api.example.com/v1/users?limit=10&sort=desc"
    print("Challenge 3 (URL Query Builder with *args and **kwargs): PASSED")
    print("\nAll methods and functions exercises completed successfully!\n")


if __name__ == "__main__":
    section_1_functions_vs_methods()
    section_2_arguments_and_parameters()
    section_3_variable_scope()
    section_4_lambdas_and_higher_order()
    section_5_decorators()
    section_6_practice_exercises()
