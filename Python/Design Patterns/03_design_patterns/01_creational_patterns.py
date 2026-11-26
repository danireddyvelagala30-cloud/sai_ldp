from abc import ABC, abstractmethod
from typing import Optional, List, Dict


class DatabaseConnectionPool:
    _instance: Optional["DatabaseConnectionPool"] = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            print("[Singleton] Creating new DatabaseConnectionPool instance...")
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, connection_string: str = "postgresql://localhost:5432/app"):
        if getattr(self, "_initialized", False):
            return
        self.connection_string = connection_string
        self.active_connections = 0
        self._initialized = True

    def query(self, sql: str) -> str:
        return f"Executing '{sql}' on {self.connection_string}"


class Notification(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str) -> None:
        pass


class EmailNotification(Notification):
    def send(self, recipient: str, message: str) -> None:
        print(f"[Email] Sending to {recipient}: '{message}'")


class SMSNotification(Notification):
    def send(self, recipient: str, message: str) -> None:
        print(f"[SMS] Sending text to {recipient}: '{message}'")


class PushNotification(Notification):
    def send(self, recipient: str, message: str) -> None:
        print(f"[Push Notification] Sending mobile push to device {recipient}: '{message}'")


class NotificationFactory:
    _registry: Dict[str, type[Notification]] = {
        "email": EmailNotification,
        "sms": SMSNotification,
        "push": PushNotification,
    }

    @classmethod
    def register_channel(cls, channel_name: str, notification_cls: type[Notification]):
        cls._registry[channel_name.lower()] = notification_cls

    @classmethod
    def create(cls, channel: str) -> Notification:
        target_cls = cls._registry.get(channel.lower())
        if not target_cls:
            valid_channels = ", ".join(cls._registry.keys())
            raise ValueError(f"Unknown notification channel '{channel}'. Valid channels: {valid_channels}")
        return target_cls()


class SQLQuery:
    def __init__(self):
        self.table: str = ""
        self.columns: List[str] = ["*"]
        self.where_clauses: List[str] = []
        self.limit_count: Optional[int] = None
        self.order_by_col: Optional[str] = None

    def __str__(self) -> str:
        sql = f"SELECT {', '.join(self.columns)} FROM {self.table}"
        if self.where_clauses:
            sql += f" WHERE {' AND '.join(self.where_clauses)}"
        if self.order_by_col:
            sql += f" ORDER BY {self.order_by_col}"
        if self.limit_count:
            sql += f" LIMIT {self.limit_count}"
        return sql + ";"


class SQLQueryBuilder:
    def __init__(self):
        self.reset()

    def reset(self) -> "SQLQueryBuilder":
        self._query = SQLQuery()
        return self

    def from_table(self, table: str) -> "SQLQueryBuilder":
        self._query.table = table
        return self

    def select(self, *columns: str) -> "SQLQueryBuilder":
        if columns:
            self._query.columns = list(columns)
        return self

    def where(self, condition: str) -> "SQLQueryBuilder":
        self._query.where_clauses.append(condition)
        return self

    def order_by(self, column: str, descending: bool = False) -> "SQLQueryBuilder":
        self._query.order_by_col = f"{column} DESC" if descending else column
        return self

    def limit(self, count: int) -> "SQLQueryBuilder":
        self._query.limit_count = count
        return self

    def build(self) -> SQLQuery:
        if not self._query.table:
            raise ValueError("Cannot build query without specifying a table name!")
        query = self._query
        self.reset()
        return query


if __name__ == "__main__":
    print("=" * 60)
    print("1. SINGLETON PATTERN DEMO")
    print("=" * 60)

    db1 = DatabaseConnectionPool()
    db2 = DatabaseConnectionPool()

    print("Are db1 and db2 the exact same instance in memory?")
    print(f"--> db1 is db2: {db1 is db2} (id: {id(db1)})")
    print(db1.query("SELECT * FROM users"))

    print("\n" + "=" * 60)
    print("2. FACTORY METHOD PATTERN DEMO")
    print("=" * 60)

    channels = ["email", "sms", "push"]
    for channel in channels:
        notifier = NotificationFactory.create(channel)
        notifier.send("user@example.com", "Your order has shipped!")

    print("\n" + "=" * 60)
    print("3. BUILDER PATTERN DEMO")
    print("=" * 60)

    builder = SQLQueryBuilder()
    query = (
        builder
        .from_table("users")
        .select("id", "username", "email")
        .where("is_active = TRUE")
        .where("age >= 18")
        .order_by("created_at", descending=True)
        .limit(10)
        .build()
    )

    print("Generated SQL Query:")
    print(f"  {query}")
