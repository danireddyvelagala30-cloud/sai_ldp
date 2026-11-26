import time
import functools
from typing import Generator, Dict, Any, List


class MockDatabaseSession:
    def __init__(self):
        self.connected = False

    def query(self, collection: str) -> List[Dict[str, Any]]:
        if not self.connected:
            raise ConnectionError("Database session is closed!")
        print(f"   [DB] Executing query on table '{collection}'...")
        return [
            {"id": 1, "username": "alice", "tier": "gold", "points": 450},
            {"id": 2, "username": "bob", "tier": "silver", "points": 120},
            {"id": 3, "username": "charlie", "tier": "gold", "points": 890},
            {"id": 4, "username": "diana", "tier": "bronze", "points": 50},
        ]


def get_db_session() -> Generator[MockDatabaseSession, None, None]:
    session = MockDatabaseSession()
    print(" [DB] Opening database connection...")
    session.connected = True
    try:
        yield session
    finally:
        session.connected = False
        print(" [DB] Closing database connection cleanly!")


def api_route_guard(endpoint_name: str, required_tier: str = "bronze"):
    def decorator(handler_func):
        @functools.wraps(handler_func)
        def wrapper(client_context: dict, *args, **kwargs):
            start = time.perf_counter()
            print(f"\n [HTTP GET] /api/v1/{endpoint_name}")
            print(f"   Client: {client_context.get('ip')} | Authenticated: {client_context.get('auth')}")

            if not client_context.get("auth"):
                return {"status": 401, "error": "Unauthorized Access"}

            result = handler_func(client_context, *args, **kwargs)
            duration_ms = (time.perf_counter() - start) * 1000
            print(f"  Finished in {duration_ms:.2f}ms with status {result.get('status', 200)}")
            return result
        return wrapper
    return decorator


@api_route_guard(endpoint_name="users/leaderboard")
def get_user_leaderboard(client: dict, min_points: int = 100):
    db_gen = get_db_session()
    db = next(db_gen)

    try:
        raw_users = db.query("users")
        qualifying_users = list(filter(lambda u: u["points"] >= min_points, raw_users))
        ranked_users = sorted(qualifying_users, key=lambda u: u["points"], reverse=True)

        return {
            "status": 200,
            "count": len(ranked_users),
            "data": ranked_users
        }
    finally:
        try:
            next(db_gen)
        except StopIteration:
            pass


def run_capstone():
    print("=" * 60)
    print("CAPSTONE: FASTAPI ARCHITECTURE SIMULATION")
    print("=" * 60)

    client_ctx = {"ip": "192.168.1.50", "auth": True}
    response = get_user_leaderboard(client_ctx, min_points=100)
    print("\n API Response Payload:")
    print(response)

    bad_client_ctx = {"ip": "10.0.0.1", "auth": False}
    unauth_response = get_user_leaderboard(bad_client_ctx)
    print("\n API Response Payload:")
    print(unauth_response)


if __name__ == "__main__":
    run_capstone()
