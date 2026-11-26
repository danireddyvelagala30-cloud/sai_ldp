from collections import Counter, defaultdict, deque, namedtuple, ChainMap

print("=" * 60)
print("1. Counter")
print("=" * 60)

words = ["fastapi", "python", "docker", "fastapi", "python", "fastapi", "redis"]
word_counts = Counter(words)
print("Word counts:", word_counts)
print("Most common 2 words:", word_counts.most_common(2))

inventory_warehouse_a = Counter(apples=10, bananas=5, oranges=2)
inventory_warehouse_b = Counter(apples=4, bananas=8, mangoes=3)
total_inventory = inventory_warehouse_a + inventory_warehouse_b
print("Combined inventory (A + B):", total_inventory)

print("\n" + "=" * 60)
print("2. defaultdict")
print("=" * 60)

orders = [
    ("tech", "Laptop"),
    ("groceries", "Milk"),
    ("tech", "Mouse"),
    ("groceries", "Bread"),
    ("tech", "Keyboard"),
    ("clothing", "Jacket"),
]

grouped_orders = defaultdict(list)
for category, item in orders:
    grouped_orders[category].append(item)

print("Grouped orders by category:")
for cat, items in grouped_orders.items():
    print(f"  - {cat}: {items}")

visit_counter = defaultdict(int)
for page in ["/home", "/about", "/home", "/products", "/home"]:
    visit_counter[page] += 1
print("Page visits:", dict(visit_counter))

print("\n" + "=" * 60)
print("3. deque")
print("=" * 60)

task_queue = deque(["task_1", "task_2", "task_3"])
task_queue.append("task_4")
task_queue.appendleft("urgent_task")
print("Deque after appends:", task_queue)

urgent = task_queue.popleft()
last = task_queue.pop()
print(f"Popped urgent: '{urgent}', Popped last: '{last}'")

recent_logs = deque(maxlen=3)
for i in range(1, 6):
    recent_logs.append(f"Log event #{i}")
    print(f"  After adding event #{i}: {list(recent_logs)}")

print("\n" + "=" * 60)
print("4. namedtuple")
print("=" * 60)

Point2D = namedtuple("Point2D", ["x", "y"])
p1 = Point2D(x=10, y=20)
print(f"Point: x={p1.x}, y={p1.y}")
print(f"Access by index: p1[0]={p1[0]}, p1[1]={p1[1]}")
print(f"Convert to dict: {p1._asdict()}")

print("\n" + "=" * 60)
print("5. ChainMap")
print("=" * 60)

defaults = {"theme": "light", "language": "en", "timeout": 30}
user_preferences = {"theme": "dark"}
cli_flags = {"timeout": 60}

app_settings = ChainMap(cli_flags, user_preferences, defaults)

print(f"Resolved theme: {app_settings['theme']}")
print(f"Resolved timeout: {app_settings['timeout']}")
print(f"Resolved language: {app_settings['language']}")
