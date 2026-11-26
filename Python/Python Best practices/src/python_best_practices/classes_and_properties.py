class BankAccount:
    def __init__(self, owner: str, initial_balance: float = 0.0) -> None:
        self.owner = owner
        self._balance: float = 0.0
        self.balance = initial_balance

    @property
    def balance(self) -> float:
        return self._balance

    @balance.setter
    def balance(self, value: float) -> None:
        if value < 0:
            msg = f"Balance cannot be negative: {value}"
            raise ValueError(msg)
        self._balance = round(value, 2)

    def deposit(self, amount: float) -> float:
        if amount <= 0:
            msg = f"Deposit amount must be positive: {amount}"
            raise ValueError(msg)
        self._balance += amount
        return self._balance

    def withdraw(self, amount: float) -> float:
        if amount <= 0:
            msg = f"Withdrawal amount must be positive: {amount}"
            raise ValueError(msg)
        if amount > self._balance:
            msg = f"Insufficient funds: cannot withdraw ${amount:.2f} from ${self._balance:.2f}"
            raise ValueError(msg)
        self._balance -= amount
        return self._balance

    def __str__(self) -> str:
        return f"BankAccount(owner='{self.owner}', balance=${self._balance:.2f})"

    def __repr__(self) -> str:
        return f"BankAccount(owner={self.owner!r}, initial_balance={self._balance!r})"
