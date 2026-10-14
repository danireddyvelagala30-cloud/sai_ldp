package com.example.solidshop.domain;

import java.math.BigDecimal;
import java.util.Objects;

public record OrderItem(Product product, int quantity) {
    public OrderItem {
        Objects.requireNonNull(product, "product");
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }
    }

    public BigDecimal lineTotal() {
        return product.unitPrice().multiply(BigDecimal.valueOf(quantity));
    }
}
