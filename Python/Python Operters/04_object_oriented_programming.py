def section_1_class_basics():
    print("=" * 50)
    print("1. Classes, Objects & Attributes")
    print("=" * 50)

    class Student:
        school_name = "Python Academy"

        def __init__(self, name: str, grade: float):
            self.name = name
            self.grade = grade

        def get_details(self) -> str:
            return f"Student: {self.name}, Grade: {self.grade}, School: {self.school_name}"

    s1 = Student("Alice", 92.5)
    s2 = Student("Bob", 88.0)

    print(s1.get_details())
    print(s2.get_details())
    print(f"Both share school_name: {s1.school_name == s2.school_name}")
    print()


def section_2_method_types():
    print("=" * 50)
    print("2. Method Types: Instance, Class, and Static Methods")
    print("=" * 50)

    class Employee:
        base_bonus_rate = 0.10

        def __init__(self, name: str, salary: float):
            self.name = name
            self.salary = salary

        def calculate_bonus(self) -> float:
            return self.salary * self.base_bonus_rate

        @classmethod
        def from_string(cls, employee_str: str):
            name, salary_str = employee_str.split("-")
            return cls(name.strip(), float(salary_str.strip()))

        @staticmethod
        def is_valid_salary(salary: float) -> bool:
            return salary > 0

    emp1 = Employee("John", 60000.0)
    emp2 = Employee.from_string("Sarah - 75000")

    print(f"{emp1.name}'s Bonus: ${emp1.calculate_bonus():.2f}")
    print(f"Created from string: {emp2.name}, Salary: ${emp2.salary:.2f}")
    print("Is 50000 valid salary?", Employee.is_valid_salary(50000))
    print("Is -100 valid salary?", Employee.is_valid_salary(-100))
    print()


def section_3_encapsulation_and_property():
    print("=" * 50)
    print("3. Encapsulation & @property Decorators")
    print("=" * 50)

    class TemperatureSensor:
        def __init__(self, celsius: float):
            self._celsius = celsius

        @property
        def celsius(self) -> float:
            return self._celsius

        @celsius.setter
        def celsius(self, value: float):
            if value < -273.15:
                raise ValueError("Temperature cannot be below absolute zero (-273.15 C)!")
            self._celsius = value

        @property
        def fahrenheit(self) -> float:
            return (self._celsius * 9 / 5) + 32

    sensor = TemperatureSensor(25.0)
    print(f"Celsius: {sensor.celsius} C")
    print(f"Calculated Fahrenheit: {sensor.fahrenheit} F")

    sensor.celsius = 30.0
    print(f"After update -> Celsius: {sensor.celsius} C, Fahrenheit: {sensor.fahrenheit} F")
    print()


def section_4_inheritance_and_polymorphism():
    print("=" * 50)
    print("4. Inheritance and Polymorphism")
    print("=" * 50)

    class PaymentMethod:
        def __init__(self, account_holder: str):
            self.account_holder = account_holder

        def pay(self, amount: float) -> str:
            raise NotImplementedError("Subclasses must implement this method")

    class CreditCardPayment(PaymentMethod):
        def __init__(self, account_holder: str, card_number: str):
            super().__init__(account_holder)
            self.card_number = card_number

        def pay(self, amount: float) -> str:
            last4 = self.card_number[-4:]
            return f"Charged ${amount:.2f} to card ending in {last4} for {self.account_holder}"

    class UpiPayment(PaymentMethod):
        def __init__(self, account_holder: str, upi_id: str):
            super().__init__(account_holder)
            self.upi_id = upi_id

        def pay(self, amount: float) -> str:
            return f"Transferred ${amount:.2f} via UPI ID '{self.upi_id}' for {self.account_holder}"

    payments: list[PaymentMethod] = [
        CreditCardPayment("Alice", "4111222233334444"),
        UpiPayment("Bob", "bob@okhdfcbank"),
    ]

    for payment in payments:
        print("  Polymorphic call:", payment.pay(99.99))
    print()


def section_5_dunder_methods():
    print("=" * 50)
    print("5. Dunder / Magic Methods (__str__, __repr__, __add__, __eq__)")
    print("=" * 50)

    class Vector2D:
        def __init__(self, x: float, y: float):
            self.x = x
            self.y = y

        def __repr__(self) -> str:
            return f"Vector2D({self.x}, {self.y})"

        def __str__(self) -> str:
            return f"({self.x}, {self.y})"

        def __add__(self, other: "Vector2D") -> "Vector2D":
            return Vector2D(self.x + other.x, self.y + other.y)

        def __eq__(self, other: object) -> bool:
            if not isinstance(other, Vector2D):
                return False
            return self.x == other.x and self.y == other.y

        def __len__(self) -> int:
            return int((self.x ** 2 + self.y ** 2) ** 0.5)

    v1 = Vector2D(3, 4)
    v2 = Vector2D(1, 2)
    v3 = v1 + v2

    print(f"v1: {v1} (str) | {repr(v1)} (repr)")
    print(f"v1 + v2 = {v3}")
    print(f"v1 == Vector2D(3, 4): {v1 == Vector2D(3, 4)}")
    print(f"len(v1) magnitude: {len(v1)}")
    print()


def section_6_practice_project():
    print("=" * 50)
    print("6. Practice Project: Bank Account System")
    print("=" * 50)

    class BankAccount:
        def __init__(self, owner: str, initial_balance: float = 0.0):
            self.owner = owner
            self._balance = initial_balance
            self._transactions: list[str] = []
            if initial_balance > 0:
                self._transactions.append(f"Initial deposit: +${initial_balance:.2f}")

        @property
        def balance(self) -> float:
            return self._balance

        def deposit(self, amount: float) -> bool:
            if amount <= 0:
                print("Deposit amount must be positive.")
                return False
            self._balance += amount
            self._transactions.append(f"Deposit: +${amount:.2f}")
            return True

        def withdraw(self, amount: float) -> bool:
            if amount <= 0:
                print("Withdrawal amount must be positive.")
                return False
            if amount > self._balance:
                print("Insufficient funds.")
                return False
            self._balance -= amount
            self._transactions.append(f"Withdrawal: -${amount:.2f}")
            return True

        def get_statement(self) -> list[str]:
            return list(self._transactions)

        def __str__(self) -> str:
            return f"Account[{self.owner}]: Balance = ${self._balance:.2f}"

    class SavingsAccount(BankAccount):
        def __init__(self, owner: str, initial_balance: float = 0.0, interest_rate: float = 0.05):
            super().__init__(owner, initial_balance)
            self.interest_rate = interest_rate

        def apply_interest(self) -> float:
            interest = self.balance * self.interest_rate
            self.deposit(interest)
            return interest

    acc = SavingsAccount("Srinivas", 1000.0, interest_rate=0.05)
    assert acc.balance == 1000.0

    acc.deposit(500.0)
    assert acc.balance == 1500.0

    acc.withdraw(200.0)
    assert acc.balance == 1300.0

    interest = acc.apply_interest()
    assert interest == 65.0
    assert acc.balance == 1365.0

    print("BankAccount & SavingsAccount tests: ALL PASSED!")
    print(acc)
    print("Transaction History:")
    for tx in acc.get_statement():
        print("  *", tx)
    print("\nAll OOP exercises completed successfully!\n")


if __name__ == "__main__":
    section_1_class_basics()
    section_2_method_types()
    section_3_encapsulation_and_property()
    section_4_inheritance_and_polymorphism()
    section_5_dunder_methods()
    section_6_practice_project()
