def section_1_conditionals():
    print("=" * 50)
    print("1. Conditional Statements (if-elif-else)")
    print("=" * 50)

    score = 85

    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"

    print(f"Score: {score} -> Grade: {grade}")

    status = "Passing" if score >= 60 else "Failing"
    print(f"Status (ternary): {status}")
    print()


def section_2_for_loops():
    print("=" * 50)
    print("2. For Loops and Iteration Patterns")
    print("=" * 50)

    print("Counting 1 to 5 with range(1, 6):", end=" ")
    for i in range(1, 6):
        print(i, end=" ")
    print()

    fruits = ["apple", "banana", "cherry"]
    print("\nEnumerating items with index:")
    for idx, fruit in enumerate(fruits, start=1):
        print(f"  {idx}. {fruit}")

    names = ["Alice", "Bob", "Charlie"]
    marks = [95, 88, 92]
    print("\nZipping names and marks together:")
    for name, mark in zip(names, marks):
        print(f"  {name} earned {mark} marks")

    person = {"name": "Srinivas", "role": "Developer", "city": "Bengaluru"}
    print("\nIterating over key-value pairs in a dictionary:")
    for key, value in person.items():
        print(f"  {key}: {value}")
    print()


def section_3_while_loops():
    print("=" * 50)
    print("3. While Loops")
    print("=" * 50)

    count = 3
    print("Countdown:")
    while count > 0:
        print(f"  T-minus {count}")
        count -= 1
    print("  Blast off!\n")


def section_4_control_statements():
    print("=" * 50)
    print("4. Control Statements: break, continue, pass")
    print("=" * 50)

    print("Skipping even numbers using 'continue':", end=" ")
    for n in range(1, 10):
        if n % 2 == 0:
            continue
        print(n, end=" ")
    print()

    print("\nStopping loop at target 5 using 'break':", end=" ")
    for n in range(1, 10):
        if n == 5:
            break
        print(n, end=" ")
    print()

    for _ in range(3):
        pass
    print("Passed through empty loop with 'pass'.\n")


def section_5_loop_else():
    print("=" * 50)
    print("5. The Unique 'for-else' and 'while-else'")
    print("=" * 50)

    def search_number(numbers, target):
        for num in numbers:
            if num == target:
                print(f"Found {target}!")
                break
        else:
            print(f"Target {target} was NOT found in the list.")

    items = [10, 20, 30, 40]
    print("Searching for 30 in [10, 20, 30, 40]:", end=" ")
    search_number(items, 30)

    print("Searching for 99 in [10, 20, 30, 40]:", end=" ")
    search_number(items, 99)
    print()


def section_6_match_case():
    print("=" * 50)
    print("6. Modern Pattern Matching (match-case)")
    print("=" * 50)

    def http_status_message(code: int) -> str:
        match code:
            case 200:
                return "200: OK"
            case 301 | 302:
                return f"{code}: Redirect"
            case 400:
                return "400: Bad Request"
            case 404:
                return "404: Not Found"
            case 500:
                return "500: Internal Server Error"
            case _:
                return f"{code}: Unknown Status Code"

    print(http_status_message(200))
    print(http_status_message(302))
    print(http_status_message(404))
    print(http_status_message(503))
    print()


def section_7_practice_exercises():
    print("=" * 50)
    print("7. Practice Exercises & Solutions")
    print("=" * 50)

    def fizz_buzz(n: int) -> list[str]:
        results = []
        for i in range(1, n + 1):
            if i % 15 == 0:
                results.append("FizzBuzz")
            elif i % 3 == 0:
                results.append("Fizz")
            elif i % 5 == 0:
                results.append("Buzz")
            else:
                results.append(str(i))
        return results

    fb_result = fizz_buzz(15)
    assert fb_result[2] == "Fizz"
    assert fb_result[4] == "Buzz"
    assert fb_result[14] == "FizzBuzz"
    print("Challenge 1 (FizzBuzz): PASSED")

    def is_prime(num: int) -> bool:
        if num < 2:
            return False
        for factor in range(2, int(num**0.5) + 1):
            if num % factor == 0:
                return False
        return True

    assert is_prime(2) is True
    assert is_prime(11) is True
    assert is_prime(4) is False
    assert is_prime(1) is False
    print("Challenge 2 (Prime Number with loop logic): PASSED")

    def reverse_integer(num: int) -> int:
        reversed_num = 0
        temp = abs(num)
        while temp > 0:
            remainder = temp % 10
            reversed_num = reversed_num * 10 + remainder
            temp //= 10
        return -reversed_num if num < 0 else reversed_num

    assert reverse_integer(12345) == 54321
    assert reverse_integer(-987) == -789
    print("Challenge 3 (Reverse Integer with while loop): PASSED")
    print("\nAll statement exercises completed successfully!\n")


if __name__ == "__main__":
    section_1_conditionals()
    section_2_for_loops()
    section_3_while_loops()
    section_4_control_statements()
    section_5_loop_else()
    section_6_match_case()
    section_7_practice_exercises()
