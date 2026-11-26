from fastapi.testclient import TestClient
from importlib import import_module

intro_module = import_module("01_intro_fastapi")
models_module = import_module("02_pydantic_models")
crud_module = import_module("03_practice_exercises")

def test_intro_fastapi():
    client = TestClient(intro_module.app)

    resp = client.get("/")
    assert resp.status_code == 200, f"Root failed: {resp.status_code}"
    assert "message" in resp.json()

    resp = client.get("/items/1")
    assert resp.status_code == 200
    assert resp.json()["data"]["name"] == "Laptop"

    resp = client.get("/items/999")
    assert resp.status_code == 404

    resp = client.get("/items/not-an-int")
    assert resp.status_code == 422

    resp = client.get("/items/?category=stationery")
    assert resp.status_code == 200
    assert resp.json()["total_returned"] == 2

def test_pydantic_models():
    client = TestClient(models_module.app)

    payload = {
        "name": "Mechanical Keyboard",
        "description": "RGB Backlit",
        "price": 100.0,
        "discount_percentage": 15.0,
        "tags": ["hardware", "typing"]
    }
    resp = client.post("/products/", json=payload)
    assert resp.status_code == 201
    data = resp.json()
    assert data["final_price"] == 85.0
    assert "id" in data

    invalid_payload = {
        "name": "Bad Item",
        "price": -10.0
    }
    resp = client.post("/products/", json=invalid_payload)
    assert resp.status_code == 422

    user_payload = {
        "username": "coder123",
        "email": "coder@example.com",
        "password": "supersecretpassword",
        "address": {
            "street": "123 Main St",
            "city": "Austin",
            "country": "USA",
            "zip_code": "78701"
        }
    }
    resp = client.post("/users/", json=user_payload)
    assert resp.status_code == 201
    user_data = resp.json()
    assert "password" not in user_data
    assert user_data["address"]["city"] == "Austin"

def test_crud_exercises():
    client = TestClient(crud_module.app)

    resp = client.get("/books/")
    assert resp.status_code == 200
    assert len(resp.json()) >= 2

    new_book = {
        "title": "Designing Data-Intensive Applications",
        "author": "Martin Kleppmann",
        "publication_year": 2017,
        "genre": "Tech",
        "pages": 616
    }
    resp = client.post("/books/", json=new_book)
    assert resp.status_code == 201
    book_id = resp.json()["id"]

    update_payload = {"pages": 620}
    resp = client.patch(f"/books/{book_id}", json=update_payload)
    assert resp.status_code == 200
    assert resp.json()["pages"] == 620
    assert resp.json()["title"] == "Designing Data-Intensive Applications"

    resp = client.delete(f"/books/{book_id}")
    assert resp.status_code == 204

    resp = client.get(f"/books/{book_id}")
    assert resp.status_code == 404

if __name__ == "__main__":
    test_intro_fastapi()
    test_pydantic_models()
    test_crud_exercises()
    print("ALL TESTS PASSED SUCCESSFULLY!")
