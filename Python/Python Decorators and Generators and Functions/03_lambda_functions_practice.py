import functools
from typing import List, Dict, Any


def part1_lambda_basics():
    print("\n--- Part 1: Lambda Syntax & Inline Conditionals ---")

    square = lambda x: x ** 2
    add = lambda a, b: a + b
    full_name = lambda first, last, title="": f"{title} {first} {last}".strip()

    print(f"Square of 5: {square(5)}")
    print(f"Add 10 + 25: {add(10, 25)}")
    print(f"Full name: {full_name('Bruce', 'Wayne', title='Mr.')}")

    sum_all = lambda *args: sum(args)
    print(f"Sum of (1, 2, 3, 4, 5): {sum_all(1, 2, 3, 4, 5)}")

    classify_age = lambda age: "Senior" if age >= 65 else ("Adult" if age >= 18 else "Minor")
    print(f"Age 15: {classify_age(15)}")
    print(f"Age 28: {classify_age(28)}")
    print(f"Age 70: {classify_age(70)}")


def part2_functional_primitives():
    print("\n--- Part 2: Using Lambdas with map(), filter(), and reduce() ---")

    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    multiplied = list(map(lambda x: x * 10, numbers))
    print(f"Original:   {numbers}")
    print(f"map (* 10): {multiplied}")

    evens = list(filter(lambda x: x % 2 == 0, numbers))
    print(f"filter (evens only): {evens}")

    first_five = [1, 2, 3, 4, 5]
    product = functools.reduce(lambda acc, item: acc * item, first_five)
    print(f"reduce (product of 1..5): {product}")

    max_val = functools.reduce(lambda a, b: a if a > b else b, numbers)
    print(f"reduce (max value): {max_val}")


def part3_sorting_with_key():
    print("\n--- Part 3: Custom Sorting & Key Functions ---")

    employees = [
        {"id": 1, "name": "Diana", "dept": "Engineering", "salary": 95000, "years": 4},
        {"id": 2, "name": "Clark", "dept": "Engineering", "salary": 110000, "years": 6},
        {"id": 3, "name": "Bruce", "dept": "Management", "salary": 150000, "years": 8},
        {"id": 4, "name": "Barry", "dept": "QA", "salary": 80000, "years": 2},
        {"id": 5, "name": "Arthur", "dept": "Engineering", "salary": 95000, "years": 2},
    ]

    sorted_by_salary = sorted(employees, key=lambda emp: emp["salary"])
    print("Sorted by Salary (Ascending):")
    for e in sorted_by_salary:
        print(f"  {e['name']}: ${e['salary']:,}")

    multi_sorted = sorted(employees, key=lambda emp: (emp["dept"], -emp["salary"]))
    print("\nSorted by Dept (Asc), then Salary (Desc):")
    for e in multi_sorted:
        print(f"  [{e['dept']}] {e['name']}: ${e['salary']:,}")

    highest_paid = max(employees, key=lambda emp: emp["salary"])
    most_junior = min(employees, key=lambda emp: emp["years"])
    print(f"\nHighest Paid: {highest_paid['name']} (${highest_paid['salary']:,})")
    print(f"Most Junior:  {most_junior['name']} ({most_junior['years']} years)")


def part4_function_factories():
    print("\n--- Part 4: Function Factories (Closures Returning Lambdas) ---")

    def power_factory(exponent: int):
        return lambda base: base ** exponent

    square_fn = power_factory(2)
    cube_fn = power_factory(3)

    print(f"3 squared = {square_fn(3)}")
    print(f"3 cubed   = {cube_fn(3)}")

    def logger_factory(prefix: str):
        return lambda msg: f"[{prefix.upper()}] {msg}"

    info_log = logger_factory("INFO")
    err_log = logger_factory("CRITICAL")

    print(info_log("Application boot successful"))
    print(err_log("Database connection lost"))


def part5_best_practices():
    print("\n--- Part 5: Best Practices ---")
    print("Use lambdas for:")
    print("   1. One-line key functions in sorted(), min(), max()")
    print("   2. Quick throwaway arguments to callbacks")
    print("   3. Short data transformations in pipelines")


def practice_challenges():
    print("\n--- Part 6: Practice Challenge (Real-World E-Commerce Filter & Transform) ---")

    inventory = [
        {"sku": "A101", "name": "Wireless Mouse", "price": 25.00, "in_stock": True, "rating": 4.5},
        {"sku": "B202", "name": "Mechanical Keyboard", "price": 95.00, "in_stock": False, "rating": 4.8},
        {"sku": "C303", "name": "USB-C Cable", "price": 12.50, "in_stock": True, "rating": 4.1},
        {"sku": "D404", "name": "4K Gaming Monitor", "price": 350.00, "in_stock": True, "rating": 4.9},
        {"sku": "E505", "name": "Desk Mat", "price": 18.00, "in_stock": False, "rating": 3.9},
    ]

    in_stock_items = list(filter(lambda item: item["in_stock"], inventory))

    discounted_items = list(map(
        lambda item: {
            **item,
            "discounted_price": round(item["price"] * 0.90, 2)
        },
        in_stock_items
    ))

    top_rated_discounted = sorted(discounted_items, key=lambda item: item["rating"], reverse=True)

    print("In-Stock Items with 10% Discount (Sorted by Highest Rating):")
    for prod in top_rated_discounted:
        print(f"  ⭐ {prod['rating']} | {prod['name']:<20} | Orig: ${prod['price']:>6.2f} -> Now: ${prod['discounted_price']:>6.2f}")


if __name__ == "__main__":
    print("=" * 60)
    print("PYTHON LAMBDA FUNCTIONS PRACTICE SUITE")
    print("=" * 60)
    part1_lambda_basics()
    part2_functional_primitives()
    part3_sorting_with_key()
    part4_function_factories()
    part5_best_practices()
    practice_challenges()
