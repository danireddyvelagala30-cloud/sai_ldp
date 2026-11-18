from pathlib import Path


def write_text_safely(file_path: Path, content: str) -> None:
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with file_path.open("w", encoding="utf-8") as file:
        file.write(content)


def read_text_safely(file_path: Path) -> str:
    if not file_path.is_file():
        msg = f"File not found: {file_path}"
        raise FileNotFoundError(msg)

    with file_path.open("r", encoding="utf-8") as file:
        return file.read()


def count_non_empty_lines(file_path: Path) -> int:
    count = 0
    with file_path.open("r", encoding="utf-8") as file:
        for line in file:
            if line.strip():
                count += 1
    return count
