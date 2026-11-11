from langchain_core.tools import tool

CURRENCY_RATES = {
    "USD": 1.0,
    "EUR": 0.92,
    "GBP": 0.79,
    "INR": 86.50,
    "JPY": 154.20,
    "CAD": 1.38,
    "AUD": 1.52,
}


@tool
def unit_converter_tool(value: float, from_unit: str, to_unit: str) -> str:
    """
    Useful to convert units of measurement (length, weight, temperature)
    and currencies (USD, EUR, GBP, INR, JPY, CAD, AUD).
    Input:
      - value: numeric amount (e.g. 100, 32.5)
      - from_unit: origin unit (e.g. 'celsius', 'fahrenheit', 'km', 'miles', 'kg', 'lbs', 'USD', 'INR')
      - to_unit: target unit (e.g. 'fahrenheit', 'celsius', 'miles', 'km', 'lbs', 'kg', 'INR', 'USD')
    """
    u_from = from_unit.strip().lower()
    u_to = to_unit.strip().lower()

    if u_from in ("c", "celsius") and u_to in ("f", "fahrenheit"):
        res = (value * 9 / 5) + 32
        return f"{value} Celsius = {res:.2f} Fahrenheit"
    if u_from in ("f", "fahrenheit") and u_to in ("c", "celsius"):
        res = (value - 32) * 5 / 9
        return f"{value} Fahrenheit = {res:.2f} Celsius"
    if u_from in ("c", "celsius") and u_to in ("k", "kelvin"):
        res = value + 273.15
        return f"{value} Celsius = {res:.2f} Kelvin"

    length_to_meters = {
        "m": 1.0, "meter": 1.0, "meters": 1.0,
        "km": 1000.0, "kilometer": 1000.0, "kilometers": 1000.0,
        "mile": 1609.34, "miles": 1609.34,
        "ft": 0.3048, "feet": 0.3048, "foot": 0.3048,
        "inch": 0.0254, "inches": 0.0254,
    }
    if u_from in length_to_meters and u_to in length_to_meters:
        in_meters = value * length_to_meters[u_from]
        converted = in_meters / length_to_meters[u_to]
        return f"{value} {from_unit} = {converted:.4f} {to_unit}"

    weight_to_kg = {
        "kg": 1.0, "kilogram": 1.0, "kilograms": 1.0,
        "g": 0.001, "gram": 0.001, "grams": 0.001,
        "lb": 0.453592, "lbs": 0.453592, "pound": 0.453592, "pounds": 0.453592,
        "oz": 0.0283495, "ounce": 0.0283495, "ounces": 0.0283495,
    }
    if u_from in weight_to_kg and u_to in weight_to_kg:
        in_kg = value * weight_to_kg[u_from]
        converted = in_kg / weight_to_kg[u_to]
        return f"{value} {from_unit} = {converted:.4f} {to_unit}"

    c_from = from_unit.strip().upper()
    c_to = to_unit.strip().upper()
    if c_from in CURRENCY_RATES and c_to in CURRENCY_RATES:
        in_usd = value / CURRENCY_RATES[c_from]
        res = in_usd * CURRENCY_RATES[c_to]
        return f"{value:.2f} {c_from} ≈ {res:.2f} {c_to} (indicative market base rate)"

    return (
        f"Conversion between '{from_unit}' and '{to_unit}' is not supported. "
        "Supported categories: Temperature (C, F, K), Length (km, miles, meters, feet), "
        "Weight (kg, lbs, grams), Currency (USD, EUR, GBP, INR, JPY, CAD, AUD)."
    )
