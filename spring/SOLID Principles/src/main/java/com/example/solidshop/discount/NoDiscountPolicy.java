package com.example.solidshop.discount;

import java.math.BigDecimal;
import java.util.Objects;

public final class NoDiscountPolicy implements DiscountPolicy {
    @Override
    public BigDecimal applyTo(BigDecimal subtotal) {
        return Objects.requireNonNull(subtotal, "subtotal");
    }
}
