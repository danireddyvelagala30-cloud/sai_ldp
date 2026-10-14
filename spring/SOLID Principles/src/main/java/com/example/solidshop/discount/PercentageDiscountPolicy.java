package com.example.solidshop.discount;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

public final class PercentageDiscountPolicy implements DiscountPolicy {
    private final BigDecimal percentage;

    public PercentageDiscountPolicy(BigDecimal percentage) {
        Objects.requireNonNull(percentage, "percentage");
        if (percentage.signum() < 0 || percentage.compareTo(BigDecimal.valueOf(100)) > 0) {
            throw new IllegalArgumentException("Discount must be between 0 and 100 percent");
        }
        this.percentage = percentage;
    }

    @Override
    public BigDecimal applyTo(BigDecimal subtotal) {
        Objects.requireNonNull(subtotal, "subtotal");
        if (subtotal.signum() < 0) {
            throw new IllegalArgumentException("Subtotal must not be negative");
        }
        BigDecimal discount = subtotal
                .multiply(percentage)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        return subtotal.subtract(discount);
    }
}
