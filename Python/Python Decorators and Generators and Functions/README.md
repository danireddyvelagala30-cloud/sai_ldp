# Complete Practice Guide: Decorators, Generators, and Lambda Functions

Welcome to your hands-on practice repository! This project contains modular, runnable Python practice files covering three foundational Python concepts with realistic use cases (including patterns seen in backend frameworks like **FastAPI**).

---

## 📂 Project Structure

| File | Topic | Key Focus Areas |
| :--- | :--- | :--- |
| [`01_decorators_practice.py`](file:///c:/Users/srini/Desktop/Python%20Fastapi/Python%20Decorators%20and%20Generators%20and%20Functions/01_decorators_practice.py) | **Python Decorators** | Closures, `@functools.wraps`, decorators with args, auth & caching, class decorators |
| [`02_generators_practice.py`](file:///c:/Users/srini/Desktop/Python%20Fastapi/Python%20Decorators%20and%20Generators%20and%20Functions/02_generators_practice.py) | **Python Generators** | `yield` vs `return`, memory benchmark, infinite sequences, stream pipelines, `.send()` |
| [`03_lambda_functions_practice.py`](file:///c:/Users/srini/Desktop/Python%20Fastapi/Python%20Decorators%20and%20Generators%20and%20Functions/03_lambda_functions_practice.py) | **Lambda Functions** | Syntax, conditionals, `map/filter/reduce`, multi-key sorting, PEP 8 best practices |
| [`04_combined_fastapi_patterns.py`](file:///c:/Users/srini/Desktop/Python%20Fastapi/Python%20Decorators%20and%20Generators%20and%20Functions/04_combined_fastapi_patterns.py) | **Real-World FastAPI Architecture** | Combining Route Guards (Decorator) + DB Session Lifecycle (Generator) + Query Pipeline (Lambda) |
| [`05_interactive_exercises.py`](file:///c:/Users/srini/Desktop/Python%20Fastapi/Python%20Decorators%20and%20Generators%20and%20Functions/05_interactive_exercises.py) | **Exercises & Test Harness** | Self-testing challenge suite with automated assertion tests |

---

## 🚀 Quick Start: Running the Modules

Open PowerShell or any terminal in this directory and run any module directly:

```powershell
# 1. Practice Decorators
python 01_decorators_practice.py

# 2. Practice Generators & Memory Benchmark
python 02_generators_practice.py

# 3. Practice Lambda Functions & Custom Sorting
python 03_lambda_functions_practice.py

# 4. Run the Integrated Backend Simulation
python 04_combined_fastapi_patterns.py

# 5. Run the Automated Test Suite
python 05_interactive_exercises.py
```

---

## 🧠 Core Mental Models & Cheat Sheet

### 1. Python Decorators
- **Mental Model**: A decorator is a function that wraps another function to modify its behavior without altering its source code.
- **The Core Rule**: Always annotate your inner wrapper with `@functools.wraps(func)` to preserve function metadata (docstring, function name).
- **Template with Arguments**:
  ```python
  import functools

  def my_decorator_factory(config_arg: str):
      def decorator(func):
          @functools.wraps(func)
          def wrapper(*args, **kwargs):
              # 1. Action BEFORE function call
              result = func(*args, **kwargs)
              # 2. Action AFTER function call
              return result
          return wrapper
      return decorator
  ```

### 2. Python Generators
- **Mental Model**: Functions that compute values lazily on-the-fly and pause their execution state using `yield`.
- **Memory Advantage**: A list of 1,000,000 integers takes **~8.0 MB** of RAM. A generator of 1,000,000 integers takes **~208 bytes** of RAM!
- **FastAPI Dependency Injection Analogy**:
  ```python
  def get_db():
      db = DatabaseConnection() # __enter__
      try:
          yield db              # provides session to the endpoint
      finally:
          db.close()            # __exit__ (guaranteed cleanup)
  ```

### 3. Lambda Functions
- **Mental Model**: Single-expression anonymous functions created on the fly.
- **Syntax**: `lambda arg1, arg2: expression`
- **Top Real-World Use Case**: Key extractor for sorting complex objects:
  ```python
  # Sort by department alphabetically, then salary descending:
  sorted_data = sorted(employees, key=lambda emp: (emp["dept"], -emp["salary"]))
  ```
- **PEP 8 Golden Rule**: If you need to name a lambda (`f = lambda x: ...`), write a regular function with `def f(x): ...` instead.
