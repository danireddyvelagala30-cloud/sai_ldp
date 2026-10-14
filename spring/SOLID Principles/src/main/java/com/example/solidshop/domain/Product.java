package com.example.solidshop.domain;

import java.math.BigDecimal;
import java.util.Objects;

public record Product(String name, BigDecimal unitPrice) {
    public Product {
        Objects.requireNonNull(name, "name");
        Objects.requireNonNull(unitPrice, "unitPrice");
        if (name.isBlank()) {
            throw new IllegalArgumentException("Product name must not be blank");
        }
        if (unitPrice.signum() < 0) {
            throw new IllegalArgumentException("Product price must not be negative");
        }
    }
}
