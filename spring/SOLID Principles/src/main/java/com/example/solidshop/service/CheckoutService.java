package com.example.solidshop.service;

import com.example.solidshop.discount.DiscountPolicy;
import com.example.solidshop.domain.CheckoutReceipt;
import com.example.solidshop.domain.Order;
import com.example.solidshop.notification.OrderNotifier;
import com.example.solidshop.payment.PaymentProcessor;
import com.example.solidshop.repository.OrderRepository;

import java.math.BigDecimal;
import java.util.Objects;

public final class CheckoutService {
    private final DiscountPolicy discountPolicy;
    private final PaymentProcessor paymentProcessor;
    private final OrderRepository orderRepository;
    private final OrderNotifier orderNotifier;

    public CheckoutService(
            DiscountPolicy discountPolicy,
            PaymentProcessor paymentProcessor,
            OrderRepository orderRepository,
            OrderNotifier orderNotifier) {
        this.discountPolicy = Objects.requireNonNull(discountPolicy, "discountPolicy");
        this.paymentProcessor = Objects.requireNonNull(paymentProcessor, "paymentProcessor");
        this.orderRepository = Objects.requireNonNull(orderRepository, "orderRepository");
        this.orderNotifier = Objects.requireNonNull(orderNotifier, "orderNotifier");
    }

    public CheckoutReceipt checkout(Order order) {
        Objects.requireNonNull(order, "order");
        BigDecimal amount = discountPolicy.applyTo(order.subtotal());
        String paymentReference = paymentProcessor.charge(amount);

        CheckoutReceipt receipt = new CheckoutReceipt(order.id(), amount, paymentReference);
        orderRepository.save(order);
        orderNotifier.sendConfirmation(order, receipt);
        return receipt;
    }
}
