from abc import ABC, abstractmethod
from typing import List, Dict


class DiscountStrategy(ABC):
    @abstractmethod
    def calculate(self, order_amount: float) -> float:
        pass


class NoDiscountStrategy(DiscountStrategy):
    def calculate(self, order_amount: float) -> float:
        return order_amount


class PercentageDiscountStrategy(DiscountStrategy):
    def __init__(self, percent: float):
        self.percent = percent

    def calculate(self, order_amount: float) -> float:
        discount = order_amount * (self.percent / 100)
        return order_amount - discount


class VIPFlatDiscountStrategy(DiscountStrategy):
    def __init__(self, flat_discount: float):
        self.flat_discount = flat_discount

    def calculate(self, order_amount: float) -> float:
        return max(0.0, order_amount - self.flat_discount)


class ShoppingCart:
    def __init__(self, discount_strategy: DiscountStrategy = None):
        self.strategy = discount_strategy or NoDiscountStrategy()
        self.items: List[float] = []

    def add_item(self, price: float):
        self.items.append(price)

    def set_discount_strategy(self, discount_strategy: DiscountStrategy):
        self.strategy = discount_strategy

    def checkout(self) -> float:
        total = sum(self.items)
        final_total = self.strategy.calculate(total)
        print(f"Subtotal: ${total:.2f} | Strategy: {self.strategy.__class__.__name__} -> Final: ${final_total:.2f}")
        return final_total


class EventObserver(ABC):
    @abstractmethod
    def update(self, event_type: str, data: dict) -> None:
        pass


class WelcomeEmailSubscriber(EventObserver):
    def update(self, event_type: str, data: dict) -> None:
        if event_type == "user_registered":
            email = data.get("email")
            print(f"[WelcomeEmailSubscriber] Sending onboarding email to {email}")


class AuditLogSubscriber(EventObserver):
    def update(self, event_type: str, data: dict) -> None:
        print(f"[AuditLogSubscriber] Logged event '{event_type}': data={data}")


class AnalyticsSubscriber(EventObserver):
    def update(self, event_type: str, data: dict) -> None:
        print(f"[AnalyticsSubscriber] Incrementing analytics counter for '{event_type}'")


class EventManager:
    def __init__(self):
        self._listeners: Dict[str, List[EventObserver]] = {}

    def subscribe(self, event_type: str, listener: EventObserver):
        if event_type not in self._listeners:
            self._listeners[event_type] = []
        self._listeners[event_type].append(listener)

    def unsubscribe(self, event_type: str, listener: EventObserver):
        if event_type in self._listeners:
            self._listeners[event_type].remove(listener)

    def notify(self, event_type: str, data: dict):
        listeners = self._listeners.get(event_type, [])
        print(f"\n[EventManager] Broadcasting '{event_type}' to {len(listeners)} observers...")
        for listener in listeners:
            listener.update(event_type, data)


class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        pass

    @abstractmethod
    def undo(self) -> None:
        pass


class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float):
        self.balance += amount
        print(f"[{self.owner}] Deposited ${amount:.2f} (New Balance: ${self.balance:.2f})")

    def withdraw(self, amount: float) -> bool:
        if self.balance >= amount:
            self.balance -= amount
            print(f"[{self.owner}] Withdrew ${amount:.2f} (New Balance: ${self.balance:.2f})")
            return True
        print(f"[{self.owner}] Failed withdrawal of ${amount:.2f} (Insufficient funds: ${self.balance:.2f})")
        return False


class DepositCommand(Command):
    def __init__(self, account: BankAccount, amount: float):
        self.account = account
        self.amount = amount

    def execute(self) -> None:
        self.account.deposit(self.amount)

    def undo(self) -> None:
        print(f"[Undo Deposit] Reversing deposit of ${self.amount:.2f}...")
        self.account.withdraw(self.amount)


class TransactionManager:
    def __init__(self):
        self._history: List[Command] = []

    def execute_command(self, cmd: Command):
        cmd.execute()
        self._history.append(cmd)

    def undo_last(self):
        if not self._history:
            print("[TransactionManager] Nothing to undo.")
            return
        last_cmd = self._history.pop()
        last_cmd.undo()


if __name__ == "__main__":
    print("=" * 60)
    print("1. STRATEGY PATTERN DEMO")
    print("=" * 60)

    cart = ShoppingCart()
    cart.add_item(50.0)
    cart.add_item(150.0)

    print("Checking out with standard (No Discount):")
    cart.checkout()

    print("\nCustomer applied a 20% coupon code:")
    cart.set_discount_strategy(PercentageDiscountStrategy(percent=20))
    cart.checkout()

    print("\nCustomer logged in as VIP ($50 flat discount):")
    cart.set_discount_strategy(VIPFlatDiscountStrategy(flat_discount=50))
    cart.checkout()

    print("\n" + "=" * 60)
    print("2. OBSERVER PATTERN DEMO")
    print("=" * 60)

    events = EventManager()
    email_sub = WelcomeEmailSubscriber()
    audit_sub = AuditLogSubscriber()
    analytics_sub = AnalyticsSubscriber()

    events.subscribe("user_registered", email_sub)
    events.subscribe("user_registered", audit_sub)
    events.subscribe("user_registered", analytics_sub)

    events.notify("user_registered", {"user_id": 42, "email": "alice@example.com"})

    print("\n" + "=" * 60)
    print("3. COMMAND PATTERN DEMO (WITH UNDO)")
    print("=" * 60)

    account = BankAccount("Bob", balance=100.0)
    tx_manager = TransactionManager()

    cmd1 = DepositCommand(account, 50.0)
    cmd2 = DepositCommand(account, 200.0)

    tx_manager.execute_command(cmd1)
    tx_manager.execute_command(cmd2)

    print("\nExecuting Undo...")
    tx_manager.undo_last()
    print(f"Final Balance: ${account.balance:.2f}")
