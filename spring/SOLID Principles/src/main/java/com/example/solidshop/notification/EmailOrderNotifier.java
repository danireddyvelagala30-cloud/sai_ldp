package com.example.solidshop.notification;

import com.example.solidshop.domain.CheckoutReceipt;
import com.example.solidshop.domain.Order;

import java.util.Objects;

public final class EmailOrderNotifier implements OrderNotifier {
    @Override
    public void sendConfirmation(Order order, CheckoutReceipt receipt) {
        Objects.requireNonNull(order, "order");
        Objects.requireNonNull(receipt, "receipt");
        System.out.printf(
                "Confirmation email sent to %s for order %s (total %s)%n",
                order.customerEmail(),
                receipt.orderId(),
                receipt.amountCharged());
    }
}
