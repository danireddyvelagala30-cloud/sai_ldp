from pathlib import Path

from python_best_practices.classes_and_properties import BankAccount
from python_best_practices.data_structures import (
    get_user_role_safe,
    is_allowed_permission,
    is_list_empty,
    merge_user_settings,
)
from python_best_practices.error_handling import (
    parse_integer_safe,
    safe_divide,
)
from python_best_practices.file_handling import (
    count_non_empty_lines,
    read_text_safely,
    write_text_safely,
)
from python_best_practices.functions_and_defaults import (
    add_item_to_cart,
    calculate_discounted_price,
)
from python_best_practices.loops_and_iteration import (
    filter_even_squares,
    format_numbered_tasks,
    format_user_details,
    pair_students_with_grades,
)
from python_best_practices.naming_and_style import (
    check_login_eligibility,
    format_user_greeting,
)


def print_section(title: str) -> None:
    print(f"\n{'=' * 65}")
    print(f"  {title}")
    print(f"{'=' * 65}")


def demo_naming_and_style() -> None:
    print_section("1. PEP 8 NAMING & F-STRINGS")
    greeting = format_user_greeting("Alex", "Administrator")
    print(f"Greeting: {greeting}")
    print(f"Eligible to login after 2 attempts? {check_login_eligibility(2)}")
    print(f"Eligible to login after 3 attempts? {check_login_eligibility(3)}")


def demo_data_structures() -> None:
    print_section("2. PYTHONIC DATA STRUCTURES")
    user = {"name": "Sara", "email": "sara@example.com"}
    role = get_user_role_safe(user)
    print(f"User role (safe fallback): {role}")

    allowed = {"read", "write", "admin"}
    print(
        f"Is 'write' allowed (O(1) set lookup)? {is_allowed_permission('write', allowed)}"
    )
    print(f"Is [] empty (truthiness check)? {is_list_empty([])}")

    defaults = {"theme": "light", "notifications": True}
    custom = {"theme": "dark"}
    merged = merge_user_settings(defaults, custom)
    print(f"Merged settings (defaults | custom): {merged}")


def demo_loops_and_iteration() -> None:
    print_section("3. LOOPS & ITERATION (enumerate, zip, comprehensions)")
    tasks = ["Write code", "Test code", "Ship to production"]
    print("Numbered tasks (enumerate):")
    for item in format_numbered_tasks(tasks):
        print(f"   {item}")

    students = ["Alice", "Bob", "Charlie"]
    grades = [95, 88, 92]
    print(f"Student Grades (zip): {pair_students_with_grades(students, grades)}")

    numbers = [1, 2, 3, 4, 5, 6]
    print(f"Even squares (list comprehension): {filter_even_squares(numbers)}")

    profile = {"username": "johndoe", "status": "active"}
    print("User details (.items()):")
    for line in format_user_details(profile):
        print(f"   {line}")


def demo_functions_and_defaults() -> None:
    print_section("4. FUNCTIONS & THE MUTABLE DEFAULT TRAP FIX")
    print("Demonstrating safe default argument with 'None':")
    cart_a = add_item_to_cart("Apple")
    cart_b = add_item_to_cart("Banana")
    print(f"Cart A: {cart_a}")
    print(f"Cart B: {cart_b}")

    discounted = calculate_discounted_price(100.0, 15.0)
    print(f"Calculated price after 15% discount: ${discounted:.2f}")


def demo_file_handling() -> None:
    print_section("5. FILE HANDLING WITH 'with' & 'pathlib.Path'")
    demo_file = Path("demo_output.txt")
    write_text_safely(
        demo_file,
        "Line 1: Python Best Practice\nLine 2: Fast and Clean\n\nLine 3: Finished\n",
    )
    content = read_text_safely(demo_file)
    non_empty = count_non_empty_lines(demo_file)
    print(f"Wrote and read back file:\n{content.strip()}")
    print(f"Non-empty lines: {non_empty}")

    if demo_file.exists():
        demo_file.unlink()
        print("Demo file cleaned up successfully.")


def demo_error_handling() -> None:
    print_section("6. SPECIFIC ERROR HANDLING (try-except-else-finally)")
    parsed = parse_integer_safe("42")
    invalid = parse_integer_safe("not_a_number", default=0)
    print(f"Parsed '42': {parsed}")
    print(f"Parsed 'not_a_number' (safe default): {invalid}")

    print(f"10 / 2: {safe_divide(10, 2)}")
    print(f"10 / 0 (safe handling): {safe_divide(10, 0)}")


def demo_classes_and_properties() -> None:
    print_section("7. CLASSES & PYTHONIC @property")
    account = BankAccount(owner="David", initial_balance=250.00)
    print(f"Display string (__str__): {account}")
    print(f"Developer repr (__repr__): {account!r}")

    account.deposit(50.00)
    account.withdraw(75.00)
    print(f"New balance: ${account.balance:.2f}")

    print("\nAttempting invalid negative balance assignment:")
    try:
        account.balance = -100.00
    except ValueError as err:
        print(f"Caught expected error from @balance.setter: {err}")


def main() -> None:
    demo_naming_and_style()
    demo_data_structures()
    demo_loops_and_iteration()
    demo_functions_and_defaults()
    demo_file_handling()
    demo_error_handling()
    demo_classes_and_properties()

    print_section("ALL BASIC BEST PRACTICES DEMONSTRATED SUCCESSFULLY!")


if __name__ == "__main__":
    main()
