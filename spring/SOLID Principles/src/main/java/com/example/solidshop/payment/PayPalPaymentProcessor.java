package com.example.solidshop.payment;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

public final class PayPalPaymentProcessor implements PaymentProcessor {
    @Override
    public String charge(BigDecimal amount) {
        Objects.requireNonNull(amount, "amount");
        if (amount.signum() < 0) {
            throw new IllegalArgumentException("Charge amount must not be negative");
        }
        String reference = "PAYPAL-" + UUID.randomUUID();
        System.out.printf("PayPal charged %s (reference %s)%n", amount, reference);
        return reference;
    }
}
