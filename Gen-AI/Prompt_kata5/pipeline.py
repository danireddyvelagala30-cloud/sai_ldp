import json

STAGE_1_PROMPT = """You are a Business Analyst. Transform this generic question into a specific question and choose the targeted database.

Available Databases:
- sales_db: Orders, products, customers, transactions, and revenue.
- hr_db: Employees, departments, payroll, and timesheets.

Output ONLY a JSON object:
{{
  "company_name": "<company>",
  "targeted_database": "<database>",
  "refined_question": "<specific question with explicit dates and measurable metrics>"
}}

Question: "{question}"
Company: "{company}"
Current Date: 2026-10-26
"""

STAGE_2_PROMPT = """You are a SQL Engineer. Generate an accurate PostgreSQL query based on the refined question and schema.

Database Schema:
{schema}

Refined Question: "{refined_question}"

Return only the SQL query.
"""

SCHEMA = """CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    order_status VARCHAR(20)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    quantity INT,
    unit_price NUMERIC
);"""

def stage_1_refine(question: str, company: str) -> dict:
    prompt = STAGE_1_PROMPT.format(question=question, company=company)
    return {
        "company_name": company,
        "targeted_database": "sales_db",
        "refined_question": "What is the monthly revenue and total completed orders for the last 6 months (May to Oct 2026)?"
    }

def stage_2_sql(stage_1_data: dict, schema: str) -> str:
    prompt = STAGE_2_PROMPT.format(
        schema=schema.strip(),
        refined_question=stage_1_data["refined_question"]
    )
    return """SELECT 
    DATE_TRUNC('month', o.order_date) AS sales_month,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(oi.quantity * oi.unit_price) AS monthly_revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_status = 'COMPLETED'
  AND o.order_date >= '2026-05-01'
GROUP BY DATE_TRUNC('month', o.order_date)
ORDER BY sales_month ASC;"""

if __name__ == "__main__":
    generic_question = "How are sales doing recently?"
    company_name = "Apex Retail"

    print("--- STAGE 1: Refined Question (JSON) ---")
    s1_output = stage_1_refine(generic_question, company_name)
    print(json.dumps(s1_output, indent=2))

    print("\n--- STAGE 2: Generated SQL ---")
    sql_query = stage_2_sql(s1_output, SCHEMA)
    print(sql_query)
