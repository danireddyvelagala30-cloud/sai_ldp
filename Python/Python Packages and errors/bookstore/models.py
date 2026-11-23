from dataclasses import dataclass
from .exceptions import InvalidPriceError


@dataclass
class Book:
    isbn: str
    title: str
    author: str
    price: float
    stock: int = 0

    def __post_init__(self):
        if not self.isbn or not isinstance(self.isbn, str):
            raise ValueError("ISBN must be a non-empty string.")
        
        if self.price <= 0:
            raise InvalidPriceError(self.price)

        if self.stock < 0:
            raise ValueError(f"Stock count cannot be negative (received: {self.stock}).")

    def __str__(self) -> str:
        return f"'{self.title}' by {self.author} [ISBN: {self.isbn}] - ${self.price:.2f} ({self.stock} in stock)"
