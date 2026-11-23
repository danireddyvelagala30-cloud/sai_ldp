from bookstore import (
    Book,
    BookStore,
    BookstoreError,
    BookNotFoundError,
    InsufficientStockError,
    InvalidPriceError,
    PaymentProcessingError,
)


def run_demo():
    print("=" * 60)
    print("TESTING CUSTOM PACKAGE: bookstore")
    print("=" * 60)

    store = BookStore("PyBooks Emporium")

    b1 = Book(isbn="978-0134076430", title="Fluent Python", author="Luciano Ramalho", price=45.00, stock=5)
    b2 = Book(isbn="978-0596517748", title="JavaScript: The Good Parts", author="Douglas Crockford", price=25.00, stock=2)

    store.add_book(b1)
    store.add_book(b2)
    print(f"Added books:\n  - {b1}\n  - {b2}")

    print("\n--- Scenario A: Successful Purchase ---")
    try:
        receipt = store.purchase_book(
            isbn="978-0134076430",
            quantity=2,
            card_number="4111-2222-3333-4444",
        )
        print(f"Order completed! Remaining copies: {receipt['remaining_stock']}")
    except BookstoreError as err:
        print(f"Unexpected error: {err}")

    print("\n--- Scenario B: Requesting More Copies Than In Stock ---")
    try:
        store.purchase_book(
            isbn="978-0596517748",
            quantity=5,
            card_number="4111-2222-3333-4444",
        )
    except InsufficientStockError as err:
        print(f"[CAUGHT EXPECTED ERROR] {err}")
        print(f"  Details -> Requested: {err.requested}, Available: {err.available}")

    print("\n--- Scenario C: Requesting A Non-Existent Book ---")
    try:
        store.purchase_book(
            isbn="999-0000000000",
            quantity=1,
            card_number="4111-2222-3333-4444",
        )
    except BookNotFoundError as err:
        print(f"[CAUGHT EXPECTED ERROR] {err}")

    print("\n--- Scenario D: Card Declined & Exception Chaining ---")
    try:
        store.purchase_book(
            isbn="978-0134076430",
            quantity=1,
            card_number="4111-2222-3333-0000",
        )
    except PaymentProcessingError as err:
        print(f"[CAUGHT EXPECTED ERROR] {err}")
        if err.__cause__:
            print(f"  Underlying cause preserved -> {type(err.__cause__).__name__}: {err.__cause__}")

    print("\n--- Scenario E: Invalid Model Attribute ---")
    try:
        _ = Book(isbn="111-222333444", title="Free Book", author="Anon", price=-10.00)
    except InvalidPriceError as err:
        print(f"[CAUGHT EXPECTED ERROR] {err}")

    print("\n--- Scenario F: Catch-All using BookstoreError Base Class ---")
    scenarios = [
        ("978-0134076430", 99, "4111-2222-3333-4444"),
        ("000-0000000000", 1, "4111-2222-3333-4444"),
    ]

    for isbn, qty, card in scenarios:
        try:
            store.purchase_book(isbn, qty, card)
        except BookstoreError as err:
            print(f"[POLYMORPHIC CATCH] {type(err).__name__} handled: {err}")

    print("\n" + "=" * 60)
    print("STORE AUDIT LOG (Recorded during operations):")
    print("=" * 60)
    for entry in store.audit_log:
        print(f"  • {entry}")


if __name__ == "__main__":
    run_demo()
