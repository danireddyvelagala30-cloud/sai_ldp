from typing import Final

MAX_LOGIN_ATTEMPTS: Final[int] = 3
DEFAULT_TIMEOUT_SECONDS: Final[float] = 30.0


class UserProfile:
    def __init__(self, username: str, email: str) -> None:
        self.username = username
        self.email = email
        self._is_active = True


def format_user_greeting(username: str, role: str) -> str:
    return f"Hello {username}! You are logged in as {role}."


def check_login_eligibility(attempt_count: int) -> bool:
    return attempt_count < MAX_LOGIN_ATTEMPTS
