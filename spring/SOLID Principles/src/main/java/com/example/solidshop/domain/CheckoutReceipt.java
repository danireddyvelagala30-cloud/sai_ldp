package com.example.solidshop.domain;

import java.math.BigDecimal;

public record CheckoutReceipt(String orderId, BigDecimal amountCharged, String paymentReference) {
}
