package com.example.solidshop.discount;

import java.math.BigDecimal;

public interface DiscountPolicy {
    BigDecimal applyTo(BigDecimal subtotal);
}
