from typing import Dict, List
from ..models import Book
from ..exceptions import BookNotFoundError, InsufficientStockError, BookstoreError
from .payment import PaymentGateway


class BookStore:
    def __init__(self, name: str):
        self.name = name
        self._inventory: Dict[str, Book] = {}
        self.audit_log: List[str] = []

    def add_book(self, book: Book) -> None:
        self._inventory[book.isbn] = book
        self.audit_log.append(f"ADDED: {book.title} (Stock: {book.stock})")

    def get_book(self, isbn: str) -> Book:
        if isbn not in self._inventory:
            raise BookNotFoundError(isbn)
        return self._inventory[isbn]

    def purchase_book(self, isbn: str, quantity: int, card_number: str) -> dict:
        book = self.get_book(isbn)
        total_cost = book.price * quantity
        order_status = "FAILED"
        txn_id = None

        print(f"\n[Store: {self.name}] Initiating order for {quantity}x '{book.title}'...")

        try:
            if quantity > book.stock:
                raise InsufficientStockError(isbn, requested=quantity, available=book.stock)

            txn_id = PaymentGateway.process_payment(card_number, total_cost)

            book.stock -= quantity
            order_status = "SUCCESS"

        except BookstoreError as err:
            self.audit_log.append(f"ORDER FAILED for ISBN {isbn}: {err}")
            print(f"  [ERROR] {err}")
            raise

        else:
            self.audit_log.append(f"ORDER SUCCESS: {quantity}x {book.title} (Txn: {txn_id})")
            print(f"  [SUCCESS] Paid ${total_cost:.2f}. Transaction ID: {txn_id}")
            return {
                "status": "SUCCESS",
                "isbn": isbn,
                "title": book.title,
                "quantity": quantity,
                "total_paid": total_cost,
                "transaction_id": txn_id,
                "remaining_stock": book.stock,
            }

        finally:
            print(f"  [AUDIT] Order attempt finished with status: {order_status}")
