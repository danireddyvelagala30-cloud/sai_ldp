class BookstoreError(Exception):
    pass


class BookNotFoundError(BookstoreError):
    def __init__(self, isbn: str):
        self.isbn = isbn
        super().__init__(f"No book found with ISBN: '{isbn}'")


class InsufficientStockError(BookstoreError):
    def __init__(self, isbn: str, requested: int, available: int):
        self.isbn = isbn
        self.requested = requested
        self.available = available
        super().__init__(
            f"Insufficient stock for ISBN '{isbn}'. Requested: {requested}, Available: {available}"
        )


class InvalidPriceError(BookstoreError):
    def __init__(self, price: float):
        self.price = price
        super().__init__(f"Invalid book price ${price:.2f}. Price must be greater than zero.")


class PaymentProcessingError(BookstoreError):
    def __init__(self, reason: str):
        self.reason = reason
        super().__init__(f"Payment processing failed: {reason}")
