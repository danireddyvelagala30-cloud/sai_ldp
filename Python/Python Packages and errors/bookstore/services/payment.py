from ..exceptions import PaymentProcessingError


class PaymentGateway:
    @staticmethod
    def process_payment(card_number: str, amount: float) -> str:
        cleaned = card_number.replace(" ", "").replace("-", "")

        try:
            if not cleaned.isdigit():
                raise ValueError("Card number must contain digits only.")
            if len(cleaned) != 16:
                raise ValueError(f"Card number must be 16 digits (got {len(cleaned)}).")
            if amount <= 0:
                raise ValueError(f"Transaction amount must be positive (got ${amount:.2f}).")

            if cleaned.endswith("0000"):
                raise RuntimeError("Card declined: insufficient funds with issuing bank.")

        except (ValueError, RuntimeError) as raw_error:
            raise PaymentProcessingError(str(raw_error)) from raw_error

        transaction_id = f"TXN-{abs(hash(cleaned + str(amount))) % 1000000:06d}"
        return transaction_id
