from typing import List, Tuple, Dict, Any


class PasswordValidationError(Exception):
    def __init__(self, errors: List[str]):
        self.errors = errors
        formatted = ", ".join(errors)
        super().__init__(f"Password validation failed: {formatted}")


def validate_password(password: str) -> bool:
    failed_rules: List[str] = []

    if len(password) < 8:
        failed_rules.append("Length must be >= 8")
    if not any(char.isdigit() for char in password):
        failed_rules.append("Must contain at least one digit")
    if not any(char.isupper() for char in password):
        failed_rules.append("Must contain at least one uppercase letter")

    if failed_rules:
        raise PasswordValidationError(failed_rules)

    return True


def parse_and_accumulate(raw_values: List[Any]) -> Tuple[float, List[str]]:
    total_sum = 0.0
    errors: List[str] = []
    processed_count = 0

    for item in raw_values:
        try:
            converted = float(item)
        except (ValueError, TypeError) as err:
            errors.append(f"Failed to parse '{item}': {type(err).__name__}")
        else:
            total_sum += converted
        finally:
            processed_count += 1

    return round(total_sum, 2), errors


class DatabaseError(Exception):
    pass


class UserNotFoundError(Exception):
    def __init__(self, user_id: int):
        self.user_id = user_id
        super().__init__(f"User with ID {user_id} does not exist.")


def query_raw_db(database: Dict[int, str], user_id: int) -> str:
    if not isinstance(user_id, int):
        raise DatabaseError("Query user_id must be an integer.")
    if user_id not in database:
        raise KeyError(f"Key {user_id} not present in table")
    return database[user_id]


def get_user_profile(database: Dict[int, str], user_id: int) -> str:
    try:
        return query_raw_db(database, user_id)
    except KeyError as err:
        raise UserNotFoundError(user_id) from err


def run_tests():
    print("=" * 60)
    print("RUNNING PRACTICE CHALLENGE TESTS")
    print("=" * 60)

    print("\nTesting Challenge 1 (Password Validation)...")
    assert validate_password("Python2026!") is True
    try:
        validate_password("weak")
        assert False, "Should have raised PasswordValidationError"
    except PasswordValidationError as e:
        assert len(e.errors) == 3, f"Expected 3 failed rules, got {len(e.errors)}"
        print("  ✓ PasswordValidationError caught with all 3 rules recorded correctly!")

    print("\nTesting Challenge 2 (Parse & Accumulate with Else/Finally)...")
    data = ["10.5", "invalid", 20, None, "50.5"]
    total, errs = parse_and_accumulate(data)
    assert total == 81.0, f"Expected total 81.0, got {total}"
    assert len(errs) == 2, f"Expected 2 errors, got {len(errs)}"
    print(f"  ✓ Processed total: {total}, caught {len(errs)} invalid items gracefully!")

    print("\nTesting Challenge 3 (Exception Chaining)...")
    mock_db = {1: "Alice", 2: "Bob"}
    assert get_user_profile(mock_db, 1) == "Alice"
    try:
        get_user_profile(mock_db, 999)
        assert False, "Should have raised UserNotFoundError"
    except UserNotFoundError as e:
        assert e.user_id == 999
        assert isinstance(e.__cause__, KeyError), "Original KeyError cause was not preserved!"
        print(f"  ✓ UserNotFoundError caught with chained cause: {type(e.__cause__).__name__}!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED SUCCESSFULLY! EXCELLENT WORK!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
