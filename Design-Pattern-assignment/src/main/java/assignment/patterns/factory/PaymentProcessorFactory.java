package assignment.patterns.factory;

import java.math.BigDecimal;

public final class PaymentProcessorFactory {
    private PaymentProcessorFactory() {
    }

    public static PaymentProcessor create(PaymentMethod method) {
        if (method == null) {
            throw new IllegalArgumentException("Payment method must not be null");
        }

        switch (method) {
            case CREDIT_CARD:
                return new CreditCardProcessor();
            case PAYPAL:
                return new PayPalProcessor();
            case BANK_TRANSFER:
                return new BankTransferProcessor();
            default:
                throw new IllegalArgumentException("Unsupported payment method: " + method);
        }
    }

    public enum PaymentMethod {
        CREDIT_CARD,
        PAYPAL,
        BANK_TRANSFER
    }

    private static final class CreditCardProcessor implements PaymentProcessor {
        @Override
        public String pay(BigDecimal amount) {
            return "Paid " + amount + " by credit card";
        }
    }

    private static final class PayPalProcessor implements PaymentProcessor {
        @Override
        public String pay(BigDecimal amount) {
            return "Paid " + amount + " with PayPal";
        }
    }

    private static final class BankTransferProcessor implements PaymentProcessor {
        @Override
        public String pay(BigDecimal amount) {
            return "Paid " + amount + " by bank transfer";
        }
    }
}
