import sys
from typing import Generator, Iterator


class CountdownIterator:
    def __init__(self, start: int):
        self.current = start

    def __iter__(self) -> "CountdownIterator":
        return self

    def __next__(self) -> int:
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


def fibonacci_generator(limit: int) -> Generator[int, None, None]:
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a
        a, b = b, a + b
        count += 1


def stream_raw_logs() -> Generator[str, None, None]:
    logs = [
        "2026-11-22 10:00:01 INFO [user_1] Login successful",
        "2026-11-22 10:00:05 ERROR [user_2] Database connection timeout",
        "2026-11-22 10:00:10 INFO [user_3] Profile updated",
        "2026-11-22 10:00:15 WARNING [user_4] Disk space at 85%",
        "2026-11-22 10:00:20 ERROR [user_5] Payment gateway rejected transaction",
        "2026-11-22 10:00:25 INFO [user_1] Logout",
    ]
    for log in logs:
        yield log


def filter_errors(log_stream: Iterator[str]) -> Generator[str, None, None]:
    for line in log_stream:
        if "ERROR" in line:
            yield line


def format_alert(error_stream: Iterator[str]) -> Generator[str, None, None]:
    for line in error_stream:
        timestamp, _, message = line.partition(" ERROR ")
        yield f"🚨 CRITICAL ALERT [{timestamp}]: {message}"


if __name__ == "__main__":
    print("=" * 60)
    print("1. CUSTOM ITERATOR CLASS")
    print("=" * 60)

    countdown = CountdownIterator(start=5)
    print("Iterating with for loop:")
    for num in countdown:
        print(f"  Count: {num}")

    print("\nManual next() iteration:")
    manual_countdown = CountdownIterator(start=2)
    print(next(manual_countdown))
    print(next(manual_countdown))
    try:
        print(next(manual_countdown))
    except StopIteration:
        print("StopIteration caught cleanly!")

    print("\n" + "=" * 60)
    print("2. GENERATORS WITH 'yield'")
    print("=" * 60)

    fib = fibonacci_generator(8)
    print("First 8 Fibonacci numbers:", list(fib))

    print("\n" + "=" * 60)
    print("3. MEMORY COMPARISON: List vs Generator Expression")
    print("=" * 60)

    N = 1_000_000
    list_comp = [x * 2 for x in range(N)]
    gen_exp = (x * 2 for x in range(N))

    print(f"Size of list comprehension (1,000,000 items): {sys.getsizeof(list_comp):,} bytes (~{sys.getsizeof(list_comp) / (1024*1024):.2f} MB)")
    print(f"Size of generator expression  (1,000,000 items): {sys.getsizeof(gen_exp):,} bytes")

    print("\n" + "=" * 60)
    print("4. STREAMING GENERATOR PIPELINE")
    print("=" * 60)

    pipeline = format_alert(filter_errors(stream_raw_logs()))

    print("Alerts emitted by pipeline:")
    for alert in pipeline:
        print(f"  {alert}")
