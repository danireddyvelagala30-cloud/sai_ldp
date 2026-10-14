package com.example.solidshop.repository;

import com.example.solidshop.domain.Order;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public final class InMemoryOrderRepository implements OrderRepository {
    private final Map<String, Order> orders = new ConcurrentHashMap<>();

    @Override
    public void save(Order order) {
        Objects.requireNonNull(order, "order");
        orders.put(order.id(), order);
    }

    @Override
    public Optional<Order> findById(String orderId) {
        return Optional.ofNullable(orders.get(Objects.requireNonNull(orderId, "orderId")));
    }
}
