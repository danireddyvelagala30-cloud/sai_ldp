package com.example.solidshop.repository;

import com.example.solidshop.domain.Order;

import java.util.Optional;

public interface OrderRepository {
    void save(Order order);

    Optional<Order> findById(String orderId);
}
