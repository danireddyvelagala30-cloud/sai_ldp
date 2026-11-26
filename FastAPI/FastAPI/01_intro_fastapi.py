from fastapi import FastAPI, HTTPException, status
from typing import Optional

app = FastAPI()

items_db = {
    1: {"name": "Laptop", "price": 999.99, "category": "electronics"},
    2: {"name": "Mouse", "price": 24.99, "category": "electronics"},
    3: {"name": "Notebook", "price": 4.99, "category": "stationery"},
    4: {"name": "Pen", "price": 1.99, "category": "stationery"},
}

@app.get("/")
def read_root():
    return {
        "message": "Welcome to FastAPI!",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }

@app.get("/items/{item_id}")
def get_item_by_id(item_id: int):
    if item_id not in items_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found."
        )
    return {"item_id": item_id, "data": items_db[item_id]}

@app.get("/items/")
def list_items(
    category: Optional[str] = None,
    min_price: float = 0.0,
    limit: int = 10
):
    results = []
    for item_id, details in items_db.items():
        if category and details["category"].lower() != category.lower():
            continue
        if details["price"] < min_price:
            continue
        results.append({"id": item_id, **details})
        if len(results) >= limit:
            break

    return {
        "total_returned": len(results),
        "filters_applied": {"category": category, "min_price": min_price, "limit": limit},
        "items": results
    }

@app.get("/users/{user_id}/profile")
def get_user_profile(user_id: int, include_email: bool = False):
    profile = {
        "user_id": user_id,
        "username": f"user_{user_id}",
    }
    if include_email:
        profile["email"] = f"user_{user_id}@example.com"
    return profile

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("01_intro_fastapi:app", host="127.0.0.1", port=8000, reload=True)
