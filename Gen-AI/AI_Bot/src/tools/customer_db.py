from typing import Optional
from langchain_core.tools import tool

ORDERS_DB = {
    "ORD-1001": {
        "customer": "Srini",
        "item": "Apple MacBook Pro M3 Max (36GB RAM, 1TB SSD)",
        "status": "Out for Delivery",
        "courier": "FedEx Express (Tracking: FX-9928192)",
        "estimated_delivery": "Today by 7:00 PM",
        "shipping_address": "Bengaluru, India",
        "total_amount": "$3,199.00",
    },
    "ORD-1002": {
        "customer": "Alex Mercer",
        "item": "Sony WH-1000XM5 Noise-Canceling Headphones",
        "status": "Shipped",
        "courier": "DHL Global (Tracking: DHL-4820194)",
        "estimated_delivery": "Tomorrow by 2:00 PM",
        "shipping_address": "Seattle, WA, USA",
        "total_amount": "$398.00",
    },
    "ORD-1003": {
        "customer": "Priya Sharma",
        "item": "Logitech MX Master 3S Wireless Mouse & Mechanical Keyboard",
        "status": "Processing in Warehouse",
        "courier": "BlueDart (Tracking: BD-1029384)",
        "estimated_delivery": "In 3 business days",
        "shipping_address": "Mumbai, India",
        "total_amount": "$220.00",
    },
    "ORD-1004": {
        "customer": "Srini",
        "item": "Dell UltraSharp 32-inch 4K USB-C Hub Monitor",
        "status": "Delivered",
        "courier": "FedEx Express (Tracking: FX-7729104)",
        "estimated_delivery": "Delivered on Nov 05, 2026",
        "shipping_address": "Bengaluru, India",
        "total_amount": "$789.00",
    },
}

POLICIES_DB = {
    "returns": "Our return window is 30 days from delivery for undamaged items with original packaging. Full refund or store credit available.",
    "refunds": "Refunds are processed within 3-5 business days back to the original payment method after items are inspected.",
    "shipping": "Standard shipping takes 3-5 business days. Express shipping delivers in 1-2 business days. Free shipping on orders over $100.",
    "warranty": "All electronics come with a 1-year limited manufacturer warranty and optional 2-year extended protection.",
}


@tool
def lookup_customer_order_tool(order_id: str) -> str:
    """
    Useful to lookup order status, shipping details, courier tracking,
    and items purchased for a given Order ID.
    Input: Order ID string, e.g. 'ORD-1001', 'ORD-1002', 'ORD-1004'.
    """
    clean_id = order_id.strip().upper()
    if clean_id in ORDERS_DB:
        info = ORDERS_DB[clean_id]
        return (
            f"Order Details for [{clean_id}]:\n"
            f"- Customer Name: {info['customer']}\n"
            f"- Item(s): {info['item']}\n"
            f"- Current Status: {info['status']}\n"
            f"- Carrier & Tracking: {info['courier']}\n"
            f"- Delivery Estimate: {info['estimated_delivery']}\n"
            f"- Total: {info['total_amount']}\n"
            f"- Destination: {info['shipping_address']}"
        )
    return (
        f"Order '{clean_id}' was not found in our database. "
        f"Valid sample order IDs include: {', '.join(ORDERS_DB.keys())}."
    )


@tool
def search_store_policy_tool(topic: str) -> str:
    """
    Useful to look up store policies regarding returns, refunds, shipping, or warranty.
    Input: Policy topic keyword, e.g. 'returns', 'refunds', 'shipping', 'warranty'.
    """
    clean_topic = topic.strip().lower()
    for key, text in POLICIES_DB.items():
        if key in clean_topic or clean_topic in key:
            return f"Store Policy ({key.capitalize()}): {text}"
    return (
        f"No specific policy found for '{topic}'. "
        f"Available policy topics: {', '.join(POLICIES_DB.keys())}."
    )
