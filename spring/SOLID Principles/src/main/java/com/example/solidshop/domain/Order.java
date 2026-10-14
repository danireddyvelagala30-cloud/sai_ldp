package com.example.solidshop.domain;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

public record Order(String id, String customerEmail, List<OrderItem> items) {
    public Order {
        Objects.requireNonNull(id, "id");
        Objects.requireNonNull(customerEmail, "customerEmail");
        Objects.requireNonNull(items, "items");
        if (id.isBlank()) {
            throw new IllegalArgumentException("Order id must not be blank");
        }
        if (customerEmail.isBlank()) {
            throw new IllegalArgumentException("Customer email must not be blank");
        }
        if (items.isEmpty()) {
            throw new IllegalArgumentException("An order must contain at least one item");
        }
        items = List.copyOf(items);
    }

    public BigDecimal subtotal() {
        return items.stream()
                .map(OrderItem::lineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
