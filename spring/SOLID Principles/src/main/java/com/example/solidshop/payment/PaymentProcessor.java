package com.example.solidshop.payment;

import java.math.BigDecimal;

public interface PaymentProcessor {
    String charge(BigDecimal amount);
}
