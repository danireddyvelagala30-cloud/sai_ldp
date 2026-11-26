"""Basic FastAPI practice app covering Path Parameters and Query Parameters."""

from enum import Enum
from typing import Annotated

from fastapi import FastAPI, Path, Query

app = FastAPI(
    title="Path & Query Parameters Practice",
    description="Basic FastAPI examples for learning path and query parameters.",
    version="1.0.0",
)

SAMPLE_ITEMS = [
    {"id": 1, "name": "Laptop", "category": "electronics", "price": 999.99, "in_stock": True},
    {"id": 2, "name": "Headphones", "category": "electronics", "price": 149.50, "in_stock": True},
    {"id": 3, "name": "Python Book", "category": "books", "price": 39.99, "in_stock": False},
    {"id": 4, "name": "Coffee Mug", "category": "home", "price": 14.99, "in_stock": True},
]


class CategoryName(str, Enum):
    """Allowed category values for predefined path parameter choices."""

    electronics = "electronics"
    books = "books"
    home = "home"


@app.get("/")
def read_root() -> dict[str, str]:
    """Health/welcome endpoint."""
    return {"message": "Visit /docs to test Path & Query Parameters interactively!"}


@app.get("/users/me")
def read_current_user() -> dict[str, str]:
    """Fixed path matched before the dynamic /users/{user_id} route."""
    return {"user_id": "current_user", "username": "learner"}


@app.get("/users/{user_id}")
def read_user(user_id: int) -> dict[str, int]:
    """Typed path parameter: FastAPI automatically parses and validates `int`."""
    return {"user_id": user_id}


@app.get("/categories/{category}")
def read_category(category: CategoryName) -> dict[str, object]:
    """Enum path parameter: restricts the path value to predefined choices."""
    matching_items = [item for item in SAMPLE_ITEMS if item["category"] == category.value]
    return {"category": category.value, "items": matching_items}


@app.get("/items/{item_id}")
def read_item_with_validation(
    item_id: Annotated[int, Path(title="Item ID", ge=1, le=1000, description="Must be between 1 and 1000")],
) -> dict[str, object]:
    """Path parameter with numeric validation using `Path(...)`."""
    for item in SAMPLE_ITEMS:
        if item["id"] == item_id:
            return {"item": item}
    return {"item_id": item_id, "detail": "Sample item not found, but ID is valid."}


@app.get("/items/")
def list_items(
    skip: Annotated[int, Query(ge=0, description="Number of items to skip")] = 0,
    limit: Annotated[int, Query(ge=1, le=50, description="Max items to return")] = 10,
    in_stock: bool | None = None,
) -> dict[str, object]:
    """Basic query parameters with defaults, optional boolean filtering, and validation."""
    results = SAMPLE_ITEMS
    if in_stock is not None:
        results = [item for item in results if item["in_stock"] is in_stock]

    sliced = results[skip : skip + limit]
    return {"skip": skip, "limit": limit, "total": len(results), "items": sliced}


@app.get("/search/")
def search_items(
    q: Annotated[str, Query(min_length=2, max_length=50, description="Required search keyword")],
    max_price: Annotated[float | None, Query(gt=0, description="Optional maximum price filter")] = None,
) -> dict[str, object]:
    """Required query parameter (`q` has no default) + optional numeric filter."""
    keyword = q.lower()
    matches = [
        item
        for item in SAMPLE_ITEMS
        if keyword in str(item["name"]).lower()
        and (max_price is None or float(item["price"]) <= max_price)
    ]
    return {"query": q, "max_price": max_price, "matches": matches}


@app.get("/tags/")
def filter_by_tags(
    tag: Annotated[list[str] | None, Query(description="Pass multiple times: ?tag=sale&tag=new")] = None,
    sort_by: Annotated[str, Query(alias="sort-by", pattern="^(name|price)$")] = "name",
) -> dict[str, object]:
    """Multiple values for one query parameter (`list[str]`) + parameter alias (`sort-by`)."""
    return {"tags": tag or [], "sort_by": sort_by}


@app.get("/users/{user_id}/orders/{order_id}")
def read_user_order(
    user_id: Annotated[int, Path(ge=1)],
    order_id: Annotated[str, Path(min_length=3, max_length=20)],
    include_details: bool = False,
    currency: Annotated[str, Query(min_length=3, max_length=3)] = "USD",
) -> dict[str, object]:
    """Multiple path parameters combined with optional query parameters."""
    response: dict[str, object] = {
        "user_id": user_id,
        "order_id": order_id,
        "currency": currency.upper(),
    }
    if include_details:
        response["details"] = {"status": "shipped", "items_count": 2}
    return response
