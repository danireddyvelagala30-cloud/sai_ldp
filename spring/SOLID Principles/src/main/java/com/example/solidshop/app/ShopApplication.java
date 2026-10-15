package com.example.solidshop.app;

import com.example.solidshop.discount.DiscountPolicy;
import com.example.solidshop.discount.PercentageDiscountPolicy;
import com.example.solidshop.domain.CheckoutReceipt;
import com.example.solidshop.domain.Order;
import com.example.solidshop.domain.OrderItem;
import com.example.solidshop.domain.Product;
import com.example.solidshop.notification.EmailOrderNotifier;
import com.example.solidshop.payment.CreditCardPaymentProcessor;
import com.example.solidshop.payment.PaymentProcessor;
import com.example.solidshop.repository.InMemoryOrderRepository;
import com.example.solidshop.repository.OrderRepository;
import com.example.solidshop.service.CheckoutService;

import java.math.BigDecimal;
import java.util.List;

public final class ShopApplication {
    private ShopApplication() {
    }

    public static void main(String[] args) {
        DiscountPolicy discountPolicy = new PercentageDiscountPolicy(BigDecimal.valueOf(10));
        PaymentProcessor paymentProcessor = new CreditCardPaymentProcessor();
        OrderRepository orderRepository = new InMemoryOrderRepository();

        CheckoutService checkoutService = new CheckoutService(
                discountPolicy,
                paymentProcessor,
                orderRepository,
                new EmailOrderNotifier());

        Order order = new Order(
                "ORDER-1001",
                "customer@example.com",
                List.of(
                        new OrderItem(new Product("Wireless headphones", new BigDecimal("80.00")), 1),
                        new OrderItem(new Product("USB-C cable", new BigDecimal("10.00")), 2)));

        CheckoutReceipt receipt = checkoutService.checkout(order);
        System.out.printf("Order %s completed. Amount paid: %s%n",
                receipt.orderId(), receipt.amountCharged());
    }
}
