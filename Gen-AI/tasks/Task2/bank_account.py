class BankAccount:
    """
    A class representing a bank account with encapsulation.
    The balance is kept private and can only be modified or viewed
    through class methods.
    """

    def __init__(self, initial_balance: float = 0.0) -> None:
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative.")
        self.__balance = initial_balance

    def deposit(self, amount: float) -> None:
        """Adds amount to the balance."""
        if amount > 0:
            self.__balance += amount
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount: float) -> None:
        """Deducts amount from the balance if sufficient funds exist."""
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds.")

    def get_balance(self) -> float:
        """Returns the current balance."""
        return self.__balance


if __name__ == "__main__":
    # Example usage
    acc = BankAccount(1000)
    acc.deposit(500)
    acc.withdraw(300)
    print(acc.get_balance())  # Output: 1200

    # Attempting to access private attribute directly
    try:
        print(acc.__balance)  # This should raise an AttributeError
    except AttributeError as e:
        print(f"AttributeError successfully raised: {e}")
