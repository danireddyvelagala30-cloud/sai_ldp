from datetime import datetime, timezone
import zoneinfo
from langchain_core.tools import tool


@tool
def get_current_datetime_tool(timezone_name: str = "UTC") -> str:
    """
    Useful to obtain current date, current time, day of the week, or year.
    Use this tool whenever the user asks 'what day is it today', 'what time is it',
    'current year/month', or time-based questions.
    Input: Optional timezone name (e.g. 'UTC', 'US/Eastern', 'Europe/London', 'Asia/Kolkata').
    Defaults to 'UTC'.
    """
    try:
        tz = zoneinfo.ZoneInfo(timezone_name.strip()) if timezone_name else timezone.utc
    except Exception:
        tz = timezone.utc
        timezone_name = "UTC (fallback)"

    now = datetime.now(tz)
    return (
        f"Current Date: {now.strftime('%A, %B %d, %Y')}\n"
        f"Current Time: {now.strftime('%I:%M:%S %p %Z')}\n"
        f"ISO Timestamp: {now.isoformat()}\n"
        f"Timezone: {timezone_name}"
    )
