import os
import json
import csv
from pathlib import Path


def demonstrate_basic_file_io(filepath: Path):
    print("\n--- 1. Basic File Writing & Reading ---")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write("First line of text\n")
        f.write("Second line of text\n")
    print(f"Wrote 2 lines to {filepath.name}")

    with open(filepath, "a", encoding="utf-8") as f:
        f.write("Third line appended\n")
    print(f"Appended 1 line to {filepath.name}")

    print("Reading line by line:")
    with open(filepath, "r", encoding="utf-8") as f:
        for line_num, line in enumerate(f, start=1):
            print(f"  Line {line_num}: {line.strip()}")


def demonstrate_file_exceptions():
    print("\n--- 2. File Handling Exceptions ---")

    non_existent = Path("non_existent_file.txt")
    try:
        with open(non_existent, "r", encoding="utf-8") as f:
            _ = f.read()
    except FileNotFoundError as err:
        print(f"[CAUGHT FileNotFoundError] {err}")

    exclusive_file = Path("test_exclusive.txt")
    try:
        with open(exclusive_file, "w", encoding="utf-8") as f:
            f.write("Initial content")

        with open(exclusive_file, "x", encoding="utf-8") as f:
            f.write("This will fail because file already exists")
    except FileExistsError as err:
        print(f"[CAUGHT FileExistsError] Cannot use 'x' mode on existing file: {err}")
    finally:
        if exclusive_file.exists():
            exclusive_file.unlink()


def demonstrate_pathlib_operations(base_dir: Path):
    print("\n--- 3. Modern File Handling with pathlib ---")

    data_dir = base_dir / "temp_logs"
    data_dir.mkdir(parents=True, exist_ok=True)

    log_file = data_dir / "app.log"
    log_file.write_text("INFO: System initialized\nWARNING: High memory usage\n", encoding="utf-8")

    content = log_file.read_text(encoding="utf-8")
    print(f"Read from {log_file.name}:\n{content.strip()}")

    print(f"File exists: {log_file.exists()}")
    print(f"File size: {log_file.stat().st_size} bytes")

    log_file.unlink()
    data_dir.rmdir()
    print("Cleaned up temp directory.")


def demonstrate_json_and_csv(base_dir: Path):
    print("\n--- 4. Structured Files: JSON & CSV ---")

    json_path = base_dir / "users.json"
    users_data = [
        {"id": 1, "username": "alice", "role": "admin"},
        {"id": 2, "username": "bob", "role": "developer"}
    ]

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(users_data, f, indent=2)

    with open(json_path, "r", encoding="utf-8") as f:
        loaded_users = json.load(f)
    print(f"Loaded {len(loaded_users)} users from JSON: {loaded_users[0]['username']}")

    corrupt_json_path = base_dir / "corrupted.json"
    corrupt_json_path.write_text("{bad_json: true,}", encoding="utf-8")

    try:
        with open(corrupt_json_path, "r", encoding="utf-8") as f:
            _ = json.load(f)
    except json.JSONDecodeError as err:
        print(f"[CAUGHT JSONDecodeError] Malformed JSON: {err.msg} at line {err.lineno}")

    csv_path = base_dir / "products.csv"
    fieldnames = ["product_id", "title", "price"]

    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerow({"product_id": "P01", "title": "Mechanical Keyboard", "price": "89.99"})
        writer.writerow({"product_id": "P02", "title": "Wireless Mouse", "price": "49.50"})

    print("Reading CSV records:")
    with open(csv_path, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            print(f"  Product: {row['title']} -> ${row['price']}")

    json_path.unlink()
    corrupt_json_path.unlink()
    csv_path.unlink()


class ManagedFileReader:
    def __init__(self, filename: Path):
        self.filename = filename
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, "r", encoding="utf-8")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file and not self.file.closed:
            self.file.close()
            print(f"ManagedFileReader: Closed {self.filename.name}")
        return False


def demonstrate_custom_context_manager(filepath: Path):
    print("\n--- 5. Custom File Context Manager ---")
    filepath.write_text("Hello from custom context manager!", encoding="utf-8")

    with ManagedFileReader(filepath) as f:
        data = f.read()
        print(f"Content read: '{data}'")

    if filepath.exists():
        filepath.unlink()


if __name__ == "__main__":
    print("=" * 60)
    print("PYTHON FILE HANDLING PRACTICE")
    print("=" * 60)

    work_dir = Path(__file__).parent
    sample_file = work_dir / "sample_text.txt"

    demonstrate_basic_file_io(sample_file)
    if sample_file.exists():
        sample_file.unlink()

    demonstrate_file_exceptions()
    demonstrate_pathlib_operations(work_dir)
    demonstrate_json_and_csv(work_dir)
    demonstrate_custom_context_manager(sample_file)

    print("\n" + "=" * 60)
    print("FILE HANDLING DEMO COMPLETED SUCCESSFULLY!")
    print("=" * 60)
