import sys
import traceback


def safe_divide(numerator: float, denominator: float) -> float | None:
    print(f"\n--- Attempting division: {numerator} / {denominator} ---")
    result = None

    try:
        num = float(numerator)
        den = float(denominator)
        result = num / den
    except ZeroDivisionError as err:
        print(f"[EXCEPT] Cannot divide by zero! Details: {err}")
    except (ValueError, TypeError) as err:
        print(f"[EXCEPT] Invalid input type or value! Details: {err}")
    else:
        print(f"[ELSE] Division succeeded! Result = {result:.4f}")
    finally:
        print("[FINALLY] Cleanup routine completed (always executes).")

    return result


def demonstrate_exception_hierarchy():
    print("\n--- 2. Exception Hierarchy Ordering ---")
    test_dict = {"title": "Python Cookbook"}

    try:
        _ = test_dict["price"]
    except KeyError as err:
        print(f"[CORRECT] Caught specific KeyError: missing key '{err.args[0]}'")
    except LookupError as err:
        print(f"[FALLBACK] Caught general LookupError: {err}")
    except Exception as err:
        print(f"[CATCH-ALL] Caught broad Exception: {err}")


def parse_user_age(age_str: str) -> int:
    try:
        age = int(age_str)
    except ValueError as err:
        raise ValueError(f"Age must be an integer, received: '{age_str}'") from err

    if age < 0 or age > 130:
        raise ValueError(f"Age {age} is out of realistic human range (0-130)")
    
    return age


def demonstrate_reraising():
    print("\n--- 3. Re-raising & Contextual Chaining ---")
    test_inputs = ["25", "-5", "not_a_number"]

    for val in test_inputs:
        try:
            parsed = parse_user_age(val)
            print(f"Successfully parsed age '{val}' -> {parsed}")
        except ValueError as err:
            print(f"Validation failed for '{val}': {err}")
            if err.__cause__:
                print(f"  --> Root cause: {type(err.__cause__).__name__}: {err.__cause__}")


class BankAccountError(Exception):
    pass


class InsufficientFundsError(BankAccountError):
    def __init__(self, current_balance: float, requested_amount: float):
        self.current_balance = current_balance
        self.requested_amount = requested_amount
        self.deficit = requested_amount - current_balance
        message = (
            f"Insufficient funds: Balance is ${current_balance:.2f}, "
            f"attempted withdrawal is ${requested_amount:.2f} (Deficit: ${self.deficit:.2f})"
        )
        super().__init__(message)


class AccountLockedError(BankAccountError):
    def __init__(self, account_id: str, reason: str = "Suspicious activity"):
        self.account_id = account_id
        self.reason = reason
        super().__init__(f"Account '{account_id}' is locked: {reason}")


class BankAccount:
    def __init__(self, account_id: str, balance: float = 0.0):
        self.account_id = account_id
        self.balance = balance
        self.is_locked = False

    def withdraw(self, amount: float) -> float:
        if self.is_locked:
            raise AccountLockedError(self.account_id, "Account flagged by security")
        if amount <= 0:
            raise ValueError("Withdrawal amount must be strictly positive")
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)

        self.balance -= amount
        return self.balance


def demonstrate_custom_exceptions():
    print("\n--- 4. Custom User-Defined Exceptions ---")
    account = BankAccount("ACC-98712", balance=150.00)

    account.withdraw(50.00)
    print(f"Withdrew $50.00. Current balance: ${account.balance:.2f}")

    try:
        account.withdraw(200.00)
    except InsufficientFundsError as err:
        print(f"[HANDLED] {err}")
        print(f"  Accessing custom properties -> Deficit: ${err.deficit:.2f}")

    account.is_locked = True
    try:
        account.withdraw(10.00)
    except BankAccountError as err:
        print(f"[HANDLED BASE EXCEPTION] {type(err).__name__}: {err}")


def demonstrate_exception_groups():
    print("\n--- 5. Exception Groups & except* (Python 3.11+) ---")
    errors = [
        ValueError("Invalid format in column 1"),
        KeyError("Missing required key 'user_id'"),
        ValueError("Value out of bounds in column 5"),
    ]
    eg = ExceptionGroup("Data validation failed across multiple checks", errors)

    try:
        raise eg
    except* ValueError as eg_val:
        print(f"[except* ValueError] Caught {len(eg_val.exceptions)} ValueError(s):")
        for sub_err in eg_val.exceptions:
            print(f"   - {sub_err}")
    except* KeyError as eg_key:
        print(f"[except* KeyError] Caught {len(eg_key.exceptions)} KeyError(s):")
        for sub_err in eg_key.exceptions:
            print(f"   - {sub_err}")


if __name__ == "__main__":
    print("=" * 60)
    print("PYTHON ERROR & EXCEPTION HANDLING DEEP DIVE")
    print("=" * 60)

    safe_divide(10, 2)
    safe_divide(10, 0)
    safe_divide("abc", 5)

    demonstrate_exception_hierarchy()
    demonstrate_reraising()
    demonstrate_custom_exceptions()
    demonstrate_exception_groups()

    print("\n" + "=" * 60)
    print("Done! You've explored core and advanced Python exception handling.")
    print("=" * 60)
