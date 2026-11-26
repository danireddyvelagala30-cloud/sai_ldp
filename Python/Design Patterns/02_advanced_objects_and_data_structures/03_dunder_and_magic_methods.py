import time
from typing import Any, List


class TaskBatch:
    def __init__(self, name: str, tasks: List[str] = None):
        self.name = name
        self._tasks: List[str] = tasks or []

    def __repr__(self) -> str:
        return f"TaskBatch(name={self.name!r}, tasks={self._tasks!r})"

    def __str__(self) -> str:
        return f"TaskBatch '{self.name}' with {len(self._tasks)} tasks"

    def __len__(self) -> int:
        return len(self._tasks)

    def __getitem__(self, index_or_slice):
        return self._tasks[index_or_slice]

    def __setitem__(self, index: int, value: str):
        self._tasks[index] = value

    def __contains__(self, item: str) -> bool:
        return item in self._tasks

    def __add__(self, other: "TaskBatch") -> "TaskBatch":
        if not isinstance(other, TaskBatch):
            return NotImplemented
        combined_name = f"{self.name} + {other.name}"
        return TaskBatch(name=combined_name, tasks=self._tasks + other._tasks)

    def __eq__(self, other: Any) -> bool:
        if not isinstance(other, TaskBatch):
            return False
        return self._tasks == other._tasks


class ExecutionTimer:
    def __init__(self, label: str):
        self.label = label
        self.start_time: float = 0.0
        self.elapsed_time: float = 0.0

    def __enter__(self):
        print(f"\n[Timer] Starting: '{self.label}'...")
        self.start_time = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed_time = time.perf_counter() - self.start_time
        print(f"[Timer] Completed: '{self.label}' in {self.elapsed_time * 1000:.3f} ms")
        return False


class RateLimiter:
    def __init__(self, max_requests_per_second: int):
        self.limit = max_requests_per_second
        self.call_count = 0

    def __call__(self, client_id: str) -> bool:
        self.call_count += 1
        allowed = self.call_count <= self.limit
        print(f"[RateLimiter] Request #{self.call_count} from '{client_id}': {'ALLOWED' if allowed else 'BLOCKED'}")
        return allowed


if __name__ == "__main__":
    print("=" * 60)
    print("1. CUSTOM SEQUENCE PROTOCOL & OPERATOR OVERLOADING")
    print("=" * 60)

    batch_a = TaskBatch("Frontend", ["Build UI", "Fix CSS", "Setup Router"])
    batch_b = TaskBatch("Backend", ["Design DB Schema", "Write Auth API"])

    print("str(batch_a) :", str(batch_a))
    print("repr(batch_a):", repr(batch_a))

    print(f"Total tasks in batch_a: {len(batch_a)}")
    print(f"First task: {batch_a[0]}")
    print(f"Slice tasks: {batch_a[1:]}")

    print(f"Is 'Fix CSS' in batch_a? {'Fix CSS' in batch_a}")
    print(f"Is 'Deploy' in batch_a?  {'Deploy' in batch_a}")

    combined_batch = batch_a + batch_b
    print("\nCombined Batch (+ operator):", combined_batch)
    print(f"All combined tasks ({len(combined_batch)}): {list(combined_batch)}")

    print("\n" + "=" * 60)
    print("2. CONTEXT MANAGER PROTOCOL (__enter__ / __exit__)")
    print("=" * 60)

    with ExecutionTimer("Data Processing Task") as timer:
        total = sum(i ** 2 for i in range(1_000_000))
        time.sleep(0.05)

    print("\n" + "=" * 60)
    print("3. CALLABLE INSTANCES (__call__)")
    print("=" * 60)

    limiter = RateLimiter(max_requests_per_second=2)
    limiter("client_abc")
    limiter("client_abc")
    limiter("client_abc")
