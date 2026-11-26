from datetime import datetime, timezone
from pydantic import BaseModel, Field, field_validator, model_validator


class Product(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    price: float = Field(..., gt=0)
    discount_percent: float = Field(default=0.0, ge=0, le=100)
    tags: list[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @field_validator("name")
    @classmethod
    def name_must_be_capitalized(cls, v: str) -> str:
        cleaned = v.strip()
        if not cleaned[0].isupper():
            raise ValueError("Product name must start with a capital letter.")
        return cleaned

    @model_validator(mode="after")
    def check_discounted_price_rules(self):
        if self.discount_percent > 50 and self.price < 10:
            raise ValueError("Products with discount > 50% must have a base price of at least $10.")
        return self


class UserRegistration(BaseModel):
    username: str = Field(min_length=3)
    password: str = Field(min_length=6)
    confirm_password: str

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match!")
        return self


def main():
    item = Product(
        name="Wireless Keyboard",
        price=49.99,
        discount_percent=10,
        tags=["electronics", "peripherals"]
    )
    print(item.model_dump_json(indent=2))

    try:
        Product(name="desk lamp", price=15.0)
    except Exception as e:
        print("Error:", e)

    try:
        Product(name="Desk Lamp", price=-5.0)
    except Exception as e:
        print("Error:", e)

    try:
        UserRegistration(
            username="john_doe",
            password="secretpassword",
            confirm_password="differentpassword"
        )
    except Exception as e:
        print("Error:", e)


if __name__ == "__main__":
    main()
