from abc import ABC, abstractmethod
import time


class ModernPaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount_dollars: float, customer_id: str) -> bool:
        pass


class LegacyStripeGateway:
    def charge_card(self, amount_in_cents: int, token: str) -> dict:
        print(f"[LegacyStripeGateway] Charging {amount_in_cents} cents to token '{token}'")
        return {"status": "success", "charge_id": "ch_987654"}


class StripeAdapter(ModernPaymentGateway):
    def __init__(self, legacy_stripe: LegacyStripeGateway):
        self._legacy_stripe = legacy_stripe

    def process_payment(self, amount_dollars: float, customer_id: str) -> bool:
        cents = int(amount_dollars * 100)
        token = f"tok_cust_{customer_id}"
        response = self._legacy_stripe.charge_card(amount_in_cents=cents, token=token)
        return response.get("status") == "success"


class DataService(ABC):
    @abstractmethod
    def fetch_data(self, query: str) -> str:
        pass


class RemoteDatabaseService(DataService):
    def fetch_data(self, query: str) -> str:
        time.sleep(0.04)
        return f"Results for SQL: '{query}'"


class DataServiceDecorator(DataService):
    def __init__(self, wrapped: DataService):
        self._wrapped = wrapped

    def fetch_data(self, query: str) -> str:
        return self._wrapped.fetch_data(query)


class LoggingDataServiceDecorator(DataServiceDecorator):
    def fetch_data(self, query: str) -> str:
        print(f"[LogDecorator] --> Query requested: '{query}'")
        result = self._wrapped.fetch_data(query)
        print(f"[LogDecorator] <-- Query completed successfully.")
        return result


class TimingDataServiceDecorator(DataServiceDecorator):
    def fetch_data(self, query: str) -> str:
        start = time.perf_counter()
        result = self._wrapped.fetch_data(query)
        duration = (time.perf_counter() - start) * 1000
        print(f"[TimingDecorator] Query executed in {duration:.2f} ms")
        return result


class InventorySystem:
    def check_stock(self, item_id: str) -> bool:
        print(f"[Inventory] Checking stock for item '{item_id}'... IN STOCK")
        return True

    def reserve_item(self, item_id: str) -> None:
        print(f"[Inventory] Reserving item '{item_id}' for order.")


class BillingSystem:
    def charge_customer(self, customer_id: str, amount: float) -> bool:
        print(f"[Billing] Charged ${amount:.2f} to customer '{customer_id}'.")
        return True


class ShippingSystem:
    def create_shipment(self, item_id: str, address: str) -> str:
        tracking_number = "TRK-987123"
        print(f"[Shipping] Shipment scheduled for '{item_id}' to '{address}'. Tracking: {tracking_number}")
        return tracking_number


class NotificationSubsystem:
    def send_confirmation(self, customer_email: str, tracking_no: str) -> None:
        print(f"[Notification] Sent confirmation email to {customer_email} with tracking {tracking_no}.")


class OrderCheckoutFacade:
    def __init__(self):
        self.inventory = InventorySystem()
        self.billing = BillingSystem()
        self.shipping = ShippingSystem()
        self.notifications = NotificationSubsystem()

    def checkout(self, customer_id: str, customer_email: str, item_id: str, amount: float, address: str) -> bool:
        print(f"\n--- [Facade] Starting Order Checkout for {customer_id} ---")
        if not self.inventory.check_stock(item_id):
            print("[Facade] Order failed: Item out of stock.")
            return False

        self.inventory.reserve_item(item_id)
        payment_success = self.billing.charge_customer(customer_id, amount)
        if not payment_success:
            print("[Facade] Order failed: Payment declined.")
            return False

        tracking_id = self.shipping.create_shipment(item_id, address)
        self.notifications.send_confirmation(customer_email, tracking_id)
        print("--- [Facade] Order Checkout Successfully Completed! ---")
        return True


if __name__ == "__main__":
    print("=" * 60)
    print("1. ADAPTER PATTERN DEMO")
    print("=" * 60)

    legacy_stripe = LegacyStripeGateway()
    modern_processor: ModernPaymentGateway = StripeAdapter(legacy_stripe)

    success = modern_processor.process_payment(amount_dollars=49.99, customer_id="cust_1001")
    print(f"Payment successful: {success}")

    print("\n" + "=" * 60)
    print("2. DECORATOR PATTERN DEMO")
    print("=" * 60)

    raw_service = RemoteDatabaseService()
    decorated_service = TimingDataServiceDecorator(LoggingDataServiceDecorator(raw_service))

    data = decorated_service.fetch_data("SELECT * FROM products WHERE in_stock = 1")
    print("Received:", data)

    print("\n" + "=" * 60)
    print("3. FACADE PATTERN DEMO")
    print("=" * 60)

    checkout_facade = OrderCheckoutFacade()
    checkout_facade.checkout(
        customer_id="cust_555",
        customer_email="john@example.com",
        item_id="prod_laptop_pro",
        amount=1299.99,
        address="123 Main St, New York, NY"
    )
