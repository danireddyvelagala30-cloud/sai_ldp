def format_numbered_tasks(tasks: list[str]) -> list[str]:
    return [f"{index}. {task}" for index, task in enumerate(tasks, start=1)]


def pair_students_with_grades(names: list[str], grades: list[int]) -> dict[str, int]:
    return dict(zip(names, grades, strict=True))


def filter_even_squares(numbers: list[int]) -> list[int]:
    return [n * n for n in numbers if n % 2 == 0]


def format_user_details(user_info: dict[str, str]) -> list[str]:
    return [f"{key.capitalize()}: {value}" for key, value in user_info.items()]
