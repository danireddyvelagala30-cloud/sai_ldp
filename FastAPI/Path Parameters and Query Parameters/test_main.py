"""Verification tests for Path Parameters and Query Parameters practice endpoints."""

import unittest

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


class TestPathAndQueryParameters(unittest.TestCase):
    def test_root(self) -> None:
        res = client.get("/")
        self.assertEqual(res.status_code, 200)
        self.assertIn("message", res.json())

    def test_fixed_user_route_before_dynamic(self) -> None:
        res = client.get("/users/me")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["user_id"], "current_user")

    def test_typed_user_path_param(self) -> None:
        self.assertEqual(client.get("/users/7").json(), {"user_id": 7})
        self.assertEqual(client.get("/users/abc").status_code, 422)

    def test_enum_category_path_param(self) -> None:
        res = client.get("/categories/electronics")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.json()["items"]), 2)
        self.assertEqual(client.get("/categories/invalid").status_code, 422)

    def test_path_validation(self) -> None:
        res = client.get("/items/1")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["item"]["name"], "Laptop")
        self.assertEqual(client.get("/items/0").status_code, 422)
        self.assertEqual(client.get("/items/1001").status_code, 422)

    def test_list_items_query_params(self) -> None:
        res = client.get("/items/?skip=1&limit=2&in_stock=true")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["total"], 3)
        self.assertEqual(len(data["items"]), 2)

    def test_required_search_query_param(self) -> None:
        self.assertEqual(client.get("/search/").status_code, 422)
        res = client.get("/search/?q=laptop&max_price=1000")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.json()["matches"]), 1)

    def test_repeated_query_params_and_alias(self) -> None:
        res = client.get("/tags/?tag=tech&tag=sale&sort-by=price")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), {"tags": ["tech", "sale"], "sort_by": "price"})
        self.assertEqual(client.get("/tags/?sort-by=invalid").status_code, 422)

    def test_combined_path_and_query_params(self) -> None:
        res = client.get("/users/5/orders/ORD123?include_details=true&currency=eur")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(
            res.json(),
            {
                "user_id": 5,
                "order_id": "ORD123",
                "currency": "EUR",
                "details": {"status": "shipped", "items_count": 2},
            },
        )


if __name__ == "__main__":
    unittest.main()
