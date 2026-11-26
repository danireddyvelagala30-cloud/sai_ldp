from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

app = FastAPI()

products_db = {}
product_id_counter = 1

users_db = {}
user_id_counter = 1

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    description: Optional[str] = Field(None, max_length=200)
    price: float = Field(..., gt=0)
    discount_percentage: float = Field(0.0, ge=0.0, le=100.0)
    tags: List[str] = Field(default_factory=list)

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    discount_percentage: float
    final_price: float
    tags: List[str]
    created_at: datetime

@app.post("/products/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate):
    global product_id_counter
    new_id = product_id_counter
    product_id_counter += 1

    discount_multiplier = 1.0 - (product.discount_percentage / 100.0)
    final_price = round(product.price * discount_multiplier, 2)

    product_record = {
        "id": new_id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "discount_percentage": product.discount_percentage,
        "final_price": final_price,
        "tags": product.tags,
        "created_at": datetime.now()
    }
    products_db[new_id] = product_record
    return product_record

@app.get("/products/", response_model=List[ProductResponse])
def list_products():
    return list(products_db.values())

@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    if product_id not in products_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {product_id} not found."
        )
    return products_db[product_id]

class Address(BaseModel):
    street: str
    city: str
    country: str = "USA"
    zip_code: str = Field(..., min_length=3, max_length=10)

class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=30)
    email: str = Field(..., min_length=5)
    password: str = Field(..., min_length=8)
    address: Optional[Address] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    address: Optional[Address] = None
    created_at: datetime

@app.post("/users/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserRegister):
    global user_id_counter
    new_user_id = user_id_counter
    user_id_counter += 1

    stored_user = {
        "id": new_user_id,
        "username": user_in.username,
        "email": user_in.email,
        "password": "hashed_secret_" + user_in.password,
        "address": user_in.address.model_dump() if user_in.address else None,
        "created_at": datetime.now()
    }
    users_db[new_user_id] = stored_user
    return stored_user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("02_pydantic_models:app", host="127.0.0.1", port=8001, reload=True)
