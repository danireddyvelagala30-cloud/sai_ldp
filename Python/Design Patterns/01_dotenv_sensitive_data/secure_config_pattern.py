import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


def mask_secret(value: str, visible_chars: int = 4) -> str:
    if not value:
        return "<not set>"
    if len(value) <= visible_chars:
        return "****"
    return f"{value[:visible_chars]}{'*' * (len(value) - visible_chars)}"


@dataclass(frozen=True)
class AppConfig:
    app_env: str
    app_debug: bool
    port: int
    secret_key: str
    database_url: str
    stripe_api_key: str

    @classmethod
    def load_from_env(cls) -> "AppConfig":
        required_keys = ["SECRET_KEY", "DATABASE_URL"]
        missing = [key for key in required_keys if not os.getenv(key)]
        if missing:
            raise ValueError(f"Missing required environment variables: {', '.join(missing)}")

        return cls(
            app_env=os.getenv("APP_ENV", "production"),
            app_debug=os.getenv("APP_DEBUG", "false").lower() in ("true", "1", "yes"),
            port=int(os.getenv("APP_PORT", 8000)),
            secret_key=os.environ["SECRET_KEY"],
            database_url=os.environ["DATABASE_URL"],
            stripe_api_key=os.getenv("STRIPE_API_KEY", "")
        )

    def __repr__(self) -> str:
        return (
            f"AppConfig("
            f"app_env='{self.app_env}', "
            f"app_debug={self.app_debug}, "
            f"port={self.port}, "
            f"secret_key='{mask_secret(self.secret_key)}', "
            f"database_url='{mask_secret(self.database_url, 15)}', "
            f"stripe_api_key='{mask_secret(self.stripe_api_key)}')"
        )


if __name__ == "__main__":
    print("--- Loading Secure App Configuration ---")
    config = AppConfig.load_from_env()

    print("\nPrinted Config:")
    print(config)

    print("\nInternal usage:")
    print(f"Connecting to database at port {config.port} in {config.app_env.upper()} mode.")
    print(f"Actual secret length: {len(config.secret_key)} characters.")
