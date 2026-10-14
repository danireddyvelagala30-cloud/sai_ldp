package com.example.solidshop.notification;

import com.example.solidshop.domain.CheckoutReceipt;
import com.example.solidshop.domain.Order;

public interface OrderNotifier {
    void sendConfirmation(Order order, CheckoutReceipt receipt);
}
