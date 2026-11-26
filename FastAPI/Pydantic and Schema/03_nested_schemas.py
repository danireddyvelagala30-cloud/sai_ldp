from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class Address(BaseModel):
    street: str
    city: str
    postal_code: str
    country: str = "India"


class OrderItem(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)
    unit_price: float = Field(gt=0)


class CustomerOrder(BaseModel):
    order_id: str
    shipping_address: Address
    items: list[OrderItem]

    @property
    def total_amount(self) -> float:
        return sum(item.quantity * item.unit_price for item in self.items)


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[str] = None
    full_name: Optional[str] = None
    password: Optional[str] = Field(None, min_length=6)


class UserResponse(UserBase):
    id: int
    is_active: bool = True
    created_at_year: int = 2026

    model_config = ConfigDict(from_attributes=True)


def main():
    order = CustomerOrder(
        order_id="ORD-90210",
        shipping_address={
            "street": "123 Tech Park, MG Road",
            "city": "Bengaluru",
            "postal_code": "560001",
        },
        items=[
            {"product_id": 101, "quantity": 2, "unit_price": 25.50},
            {"product_id": 102, "quantity": 1, "unit_price": 49.00},
        ]
    )

    print(f"Order ID: {order.order_id}")
    print(f"Deliver to: {order.shipping_address.city}, {order.shipping_address.country}")
    print(f"Number of items: {len(order.items)}")
    print(f"Total calculated amount: ${order.total_amount:.2f}")

    client_payload = {
        "username": "srinivas",
        "email": "srini@example.com",
        "full_name": "Srinivas Rao",
        "password": "supersecretpassword123"
    }
    user_in = UserCreate(**client_payload)
    print(user_in.model_dump())

    simulated_db_record = {
        "id": 42,
        "username": user_in.username,
        "email": user_in.email,
        "full_name": user_in.full_name,
        "hashed_password": "fake_hashed_string_xyz",
        "is_active": True,
        "created_at_year": 2026
    }

    user_out = UserResponse(**simulated_db_record)
    print(user_out.model_dump_json(indent=2))


if __name__ == "__main__":
    main()
