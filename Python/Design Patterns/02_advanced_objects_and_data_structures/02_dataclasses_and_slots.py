import sys
import tracemalloc
from dataclasses import dataclass, field
from typing import List


@dataclass(order=True)
class Product:
    sort_index: float = field(init=False, repr=False)
    name: str
    price: float
    tags: List[str] = field(default_factory=list)
    is_active: bool = True

    def __post_init__(self):
        if self.price < 0:
            raise ValueError(f"Price cannot be negative! Got: {self.price}")
        self.sort_index = self.price


@dataclass(frozen=True)
class DatabaseCredentials:
    host: str
    port: int
    database: str


class StandardUser:
    def __init__(self, username: str, email: str, age: int):
        self.username = username
        self.email = email
        self.age = age


class SlottedUser:
    __slots__ = ("username", "email", "age")

    def __init__(self, username: str, email: str, age: int):
        self.username = username
        self.email = email
        self.age = age


@dataclass(slots=True)
class SlottedDataclassUser:
    username: str
    email: str
    age: int


if __name__ == "__main__":
    print("=" * 60)
    print("1. DATACLASS IN ACTION")
    print("=" * 60)

    p1 = Product(name="Wireless Mouse", price=29.99, tags=["electronics", "peripherals"])
    p2 = Product(name="Mechanical Keyboard", price=89.99, tags=["electronics", "hardware"])
    p3 = Product(name="USB Cable", price=9.99)

    print("Product instance:", p1)
    print("Equality check (p1 == p2):", p1 == p2)
    print("Comparison (p3 < p1):", p3 < p1)

    inventory = [p1, p2, p3]
    print("\nSorted by price (ascending):")
    for prod in sorted(inventory):
        print(f"  - {prod.name}: ${prod.price}")

    creds = DatabaseCredentials(host="localhost", port=5432, database="prod_db")
    print("\nImmutable Credentials:", creds)
    try:
        creds.port = 3306
    except Exception as e:
        print(f"Caught expected mutation error: {type(e).__name__} - {e}")

    print("\n" + "=" * 60)
    print("2. MEMORY PROFILING: Standard vs Slotted Objects")
    print("=" * 60)

    std_user = StandardUser("alice", "alice@example.com", 28)
    slot_user = SlottedUser("alice", "alice@example.com", 28)

    print("Standard User __dict__:", std_user.__dict__)
    has_dict = hasattr(slot_user, "__dict__")
    print(f"Slotted User has __dict__: {has_dict}")

    std_user.emial = "typo@example.com"
    print("Standard User accepted typo attribute 'emial'.")

    try:
        slot_user.emial = "typo@example.com"
    except AttributeError as err:
        print(f"Slotted User blocked typo attribute: {err}")

    COUNT = 100_000
    print(f"\nSimulating creation of {COUNT:,} instances in memory...")

    tracemalloc.start()
    std_objects = [StandardUser(f"user_{i}", f"user_{i}@test.com", i % 80) for i in range(COUNT)]
    current, peak_std = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    del std_objects

    tracemalloc.start()
    slot_objects = [SlottedUser(f"user_{i}", f"user_{i}@test.com", i % 80) for i in range(COUNT)]
    current, peak_slot = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    del slot_objects

    print(f"Memory used by Standard Users: {peak_std / (1024 * 1024):.2f} MB")
    print(f"Memory used by Slotted Users : {peak_slot / (1024 * 1024):.2f} MB")
    savings = (1 - (peak_slot / peak_std)) * 100
    print(f"--> Memory Reduction: {savings:.1f}% savings with __slots__!")
