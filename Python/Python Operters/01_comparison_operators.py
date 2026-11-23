import math


def section_1_basic_operators():
    print("=" * 50)
    print("1. Basic Comparison Operators")
    print("=" * 50)

    a, b = 15, 10

    print(f"a = {a}, b = {b}")
    print(f"a == b -> {a == b}  (Equal to)")
    print(f"a != b -> {a != b}  (Not equal to)")
    print(f"a > b  -> {a > b}   (Greater than)")
    print(f"a < b  -> {a < b}   (Less than)")
    print(f"a >= b -> {a >= b}  (Greater than or equal to)")
    print(f"a <= b -> {a <= b}  (Less than or equal to)")
    print()


def section_2_type_comparisons():
    print("=" * 50)
    print("2. Comparing Strings, Lists, and Floats")
    print("=" * 50)

    print("'apple' < 'banana':", "apple" < "banana")
    print("'Apple' < 'apple':", "Apple" < "apple")

    list1 = [1, 2, 3]
    list2 = [1, 2, 4]
    print(f"{list1} < {list2}:", list1 < list2)

    f1 = 0.1 + 0.2
    f2 = 0.3
    print(f"0.1 + 0.2 == 0.3: {f1 == f2} (value is {f1})")
    print(f"Using math.isclose(0.1 + 0.2, 0.3): {math.isclose(f1, f2)}")
    print()


def section_3_chained_comparisons():
    print("=" * 50)
    print("3. Chained Comparison Operators")
    print("=" * 50)

    x = 25

    print("x =", x)
    print("10 < x < 30      ->", 10 < x < 30)
    print("10 < x and x < 30->", 10 < x and x < 30)
    print("1 < 2 < 3 < 4    ->", 1 < 2 < 3 < 4)
    print("1 < 2 > 0 == 0   ->", 1 < 2 > 0 == 0)
    print()


def section_4_equality_vs_identity():
    print("=" * 50)
    print("4. Equality (==) vs Identity (is)")
    print("=" * 50)

    list_a = [1, 2, 3]
    list_b = [1, 2, 3]
    list_c = list_a

    print(f"list_a: {list_a} at {id(list_a)}")
    print(f"list_b: {list_b} at {id(list_b)}")
    print(f"list_c: {list_c} at {id(list_c)}")

    print(f"list_a == list_b : {list_a == list_b} (same values)")
    print(f"list_a is list_b : {list_a is list_b} (different objects in memory)")
    print(f"list_a is list_c : {list_a is list_c} (same object reference)")

    val = None
    print(f"val is None: {val is None}")
    print()


def section_5_practice_exercises():
    print("=" * 50)
    print("5. Practice Exercises & Solutions")
    print("=" * 50)

    def is_working_age(age: int) -> bool:
        return 18 <= age <= 65

    assert is_working_age(25) is True
    assert is_working_age(17) is False
    assert is_working_age(65) is True
    print("Challenge 1 (Age check 18 <= age <= 65): PASSED")

    def is_valid_password(pwd: str) -> bool:
        return 8 <= len(pwd) <= 20 and not pwd[0].isdigit()

    assert is_valid_password("securePass123") is True
    assert is_valid_password("short") is False
    assert is_valid_password("123badPassword") is False
    print("Challenge 2 (Password validation with comparisons): PASSED")

    def is_valid_triangle(a: float, b: float, c: float) -> bool:
        return (a + b > c) and (a + c > b) and (b + c > a)

    assert is_valid_triangle(3, 4, 5) is True
    assert is_valid_triangle(1, 2, 10) is False
    print("Challenge 3 (Triangle inequality theorem): PASSED")
    print("\nAll comparison operator exercises completed successfully!\n")


if __name__ == "__main__":
    section_1_basic_operators()
    section_2_type_comparisons()
    section_3_chained_comparisons()
    section_4_equality_vs_identity()
    section_5_practice_exercises()
