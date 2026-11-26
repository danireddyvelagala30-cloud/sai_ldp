from typing import Optional
from pydantic import BaseModel, ValidationError


class User(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool = True
    bio: Optional[str] = None


def main():
    user_data = {
        "id": "1",
        "username": "alex_coder",
        "email": "alex@example.com",
        "is_active": "true",
    }
    user = User(**user_data)
    print(user)
    print(f"User ID type: {type(user.id)} (value: {user.id})")
    print(f"Is Active: {user.is_active} (type: {type(user.is_active)})\n")

    user_dict = user.model_dump()
    print(user_dict)

    user_json = user.model_dump_json(indent=2)
    print(user_json)

    invalid_data = {
        "id": "not-an-integer",
        "username": "alex",
    }

    try:
        User(**invalid_data)
    except ValidationError as e:
        print(e)
        for error in e.errors():
            loc = " -> ".join(str(x) for x in error["loc"])
            print(f"- Field '{loc}': {error['msg']} (type: {error['type']})")


if __name__ == "__main__":
    main()
