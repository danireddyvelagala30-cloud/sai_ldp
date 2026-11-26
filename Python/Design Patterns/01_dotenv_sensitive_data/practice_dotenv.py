import os
from dotenv import load_dotenv, dotenv_values, find_dotenv

env_file_path = find_dotenv()
print(f"[1] Located .env file at: {env_file_path}")

load_dotenv(dotenv_path=env_file_path, override=True)

print("\n[2] Reading Environment Variables:")
app_env = os.getenv("APP_ENV", "production")
app_port = os.getenv("APP_PORT", "8000")
secret_key = os.getenv("SECRET_KEY")

print(f"  - APP_ENV: {app_env}")
print(f"  - APP_PORT (raw string): {app_port!r}")
print(f"  - SECRET_KEY loaded: {'Yes' if secret_key else 'No'}")

try:
    db_url = os.environ["DATABASE_URL"]
    print(f"  - DATABASE_URL: {db_url}")
except KeyError as err:
    print(f"  - CRITICAL ERROR: Missing required env var: {err}")

print("\n[3] Type Casting:")
raw_debug = os.getenv("APP_DEBUG", "false")
app_debug = raw_debug.lower() in ("true", "1", "t", "yes")
print(f"  - APP_DEBUG: {app_debug} (type: {type(app_debug).__name__})")

port = int(os.getenv("APP_PORT", 8000))
max_connections = int(os.getenv("DATABASE_MAX_CONNECTIONS", 10))
print(f"  - PORT: {port} (type: {type(port).__name__})")
print(f"  - MAX_CONNECTIONS: {max_connections} (type: {type(max_connections).__name__})")

timeout = float(os.getenv("DATABASE_TIMEOUT_SECONDS", 5.0))
print(f"  - TIMEOUT: {timeout}s (type: {type(timeout).__name__})")

print("\n[4] Using dotenv_values() to get a pure dictionary:")
config_dict = dotenv_values(dotenv_path=env_file_path)
print(f"  - Keys found in .env: {list(config_dict.keys())}")
print(f"  - Stripe Key starts with: {config_dict.get('STRIPE_API_KEY', '')[:7]}...")
