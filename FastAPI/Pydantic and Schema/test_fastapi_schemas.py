from fastapi.testclient import TestClient
from importlib import import_module

fastapi_schemas = import_module("04_fastapi_schemas")
client = TestClient(fastapi_schemas.app)


def test_api():
    payload = {
        "title": "Designing Data-Intensive Applications",
        "author": "Martin Kleppmann",
        "price": 45.0,
        "pages": 616,
        "secret_internal_notes": "Wholesale discount applied"
    }
    response = client.post("/books", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert "secret_internal_notes" not in data
    book_id = data["id"]

    invalid_payload = {
        "title": "",
        "author": "A",
        "price": -10.0
    }
    bad_resp = client.post("/books", json=invalid_payload)
    assert bad_resp.status_code == 422

    update_payload = {"price": 39.99}
    put_resp = client.put(f"/books/{book_id}", json=update_payload)
    assert put_resp.status_code == 200
    updated_data = put_resp.json()
    assert updated_data["price"] == 39.99
    assert updated_data["title"] == "Designing Data-Intensive Applications"

    list_resp = client.get("/books")
    assert list_resp.status_code == 200
    assert len(list_resp.json()) >= 1

    print("All tests passed successfully.")


if __name__ == "__main__":
    test_api()
