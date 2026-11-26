from typing import Any


def get_user_role_safe(user_data: dict[str, Any], default: str = "guest") -> str:
    return str(user_data.get("role", default))


def is_allowed_permission(permission: str, allowed_permissions: set[str]) -> bool:
    return permission in allowed_permissions


def is_list_empty(items: list[Any]) -> bool:
    return not items


def merge_user_settings(
    defaults: dict[str, Any], custom: dict[str, Any]
) -> dict[str, Any]:
    return defaults | custom
