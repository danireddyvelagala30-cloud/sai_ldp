import sys
import time
import itertools
from contextlib import contextmanager
from typing import Generator, List, Dict, Any


def part1_yield_basics():
    print("\n--- Part 1: How 'yield' Works vs 'return' ---")

    def count_up_to(max_val: int) -> Generator[int, None, None]:
        print("   [Gen] Starting generator...")
        count = 1
        while count <= max_val:
            print(f"   [Gen] Yielding {count}...")
            yield count
            print(f"   [Gen] Resumed after yielding {count}!")
            count += 1
        print("   [Gen] Generator exhausted!")

    gen = count_up_to(3)
    print(f"Generator object: {gen}")

    print("Call next(gen):", next(gen))
    print("Call next(gen):", next(gen))
    print("Call next(gen):", next(gen))

    try:
        next(gen)
    except StopIteration:
        print("Caught StopIteration: The generator has finished yielding values.")

    print("\nIterating with a standard for loop:")
    for num in count_up_to(2):
        print(f"Loop received: {num}")


def part2_memory_efficiency():
    print("\n--- Part 2: Memory Efficiency: List vs Generator ---")

    N = 1_000_000

    list_start = time.perf_counter()
    squares_list = [i * i for i in range(N)]
    list_time = time.perf_counter() - list_start
    list_size = sys.getsizeof(squares_list)

    gen_start = time.perf_counter()
    squares_gen = (i * i for i in range(N))
    gen_time = time.perf_counter() - gen_start
    gen_size = sys.getsizeof(squares_gen)

    print(f"📊 For {N:,} elements:")
    print(f"   List Comprehension -> Memory: {list_size / (1024 * 1024):.2f} MB | Creation Time: {list_time:.4f}s")
    print(f"   Generator Expr     -> Memory: {gen_size} Bytes ({gen_size / (1024 * 1024):.6f} MB) | Creation Time: {gen_time:.6f}s")


def part3_infinite_generators():
    print("\n--- Part 3: Infinite Sequences ---")

    def infinite_fibonacci() -> Generator[int, None, None]:
        a, b = 0, 1
        while True:
            yield a
            a, b = b, a + b

    fib = infinite_fibonacci()

    first_10_fib = list(itertools.islice(fib, 10))
    print(f"First 10 Fibonacci numbers: {first_10_fib}")

    next_5_fib = list(itertools.islice(fib, 5))
    print(f"Next 5 Fibonacci numbers:   {next_5_fib}")


def part4_generator_pipelines():
    print("\n--- Part 4: Generator Pipelines (Stream Processing) ---")

    raw_logs = [
        '2026-11-19 10:00:01 INFO Server started',
        '2026-11-19 10:00:04 WARNING High CPU usage (85%)',
        '2026-11-19 10:00:15 ERROR Database connection timeout (db_pool)',
        '2026-11-19 10:00:18 INFO Health check passed',
        '2026-11-19 10:00:22 ERROR Redis connection refused (cache)',
        '2026-11-19 10:00:29 ERROR Payment gateway timeout (stripe)',
        '2026-11-19 10:00:35 INFO Job completed',
    ]

    def read_lines(logs: List[str]) -> Generator[str, None, None]:
        for line in logs:
            yield line

    def filter_errors(lines: Generator[str, None, None]) -> Generator[str, None, None]:
        for line in lines:
            if "ERROR" in line:
                yield line

    def parse_log(lines: Generator[str, None, None]) -> Generator[Dict[str, str], None, None]:
        for line in lines:
            parts = line.split(" ", 3)
            yield {
                "timestamp": f"{parts[0]} {parts[1]}",
                "level": parts[2],
                "message": parts[3]
            }

    log_stream = read_lines(raw_logs)
    error_stream = filter_errors(log_stream)
    parsed_errors = parse_log(error_stream)

    print("Parsed ERROR records from stream:")
    for error in parsed_errors:
        print(f"  🚨 [{error['timestamp']}] -> {error['message']}")


def part5_generator_send():
    print("\n--- Part 5: Two-Way Generators with .send() ---")

    def running_average() -> Generator[float, float, None]:
        total = 0.0
        count = 0
        average = 0.0
        while True:
            value = yield average
            if value is None:
                break
            total += value
            count += 1
            average = total / count

    avg_gen = running_average()
    next(avg_gen)

    print(f"Sent 10 -> Running Average: {avg_gen.send(10)}")
    print(f"Sent 20 -> Running Average: {avg_gen.send(20)}")
    print(f"Sent 60 -> Running Average: {avg_gen.send(60)}")
    
    avg_gen.close()


def part6_context_manager():
    print("\n--- Part 6: Context Manager using @contextmanager ---")

    @contextmanager
    def managed_resource(name: str):
        print(f"🔒 [ENTER] Acquiring resource: {name}")
        resource = {"resource_name": name, "status": "active"}
        try:
            yield resource
        finally:
            print(f"🔓 [EXIT] Releasing resource: {name}")

    with managed_resource("DatabaseConnection") as conn:
        print(f"   Executing query with {conn['resource_name']} (Status: {conn['status']})")


def practice_challenges():
    print("\n--- Part 7: Practice Challenge: Batch/Chunk Processor ---")

    def chunker(iterable, chunk_size: int):
        chunk = []
        for item in iterable:
            chunk.append(item)
            if len(chunk) == chunk_size:
                yield chunk
                chunk = []
        if chunk:
            yield chunk

    dataset = list(range(1, 12))
    print(f"Dataset: {dataset}")
    print("Batches of 3:")
    for batch_num, batch in enumerate(chunker(dataset, 3), start=1):
        print(f"  Batch {batch_num}: {batch}")


if __name__ == "__main__":
    print("=" * 60)
    print("PYTHON GENERATORS PRACTICE SUITE")
    print("=" * 60)
    part1_yield_basics()
    part2_memory_efficiency()
    part3_infinite_generators()
    part4_generator_pipelines()
    part5_generator_send()
    part6_context_manager()
    practice_challenges()
