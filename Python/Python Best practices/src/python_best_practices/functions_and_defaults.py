def add_item_to_cart(item: str, cart: list[str] | None = None) -> list[str]:
    if cart is None:
        cart = []
    cart.append(item)
    return cart


def calculate_discounted_price(
    base_price: float,
    discount_percentage: float = 0.0,
) -> float:
    if base_price < 0:
        msg = f"Base price cannot be negative: {base_price}"
        raise ValueError(msg)

    if not 0.0 <= discount_percentage <= 100.0:
        msg = f"Discount must be between 0 and 100, got: {discount_percentage}"
        raise ValueError(msg)

    discount_amount = base_price * (discount_percentage / 100.0)
    return round(base_price - discount_amount, 2)
