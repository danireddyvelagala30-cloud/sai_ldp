package com.practice.order;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final ProductClient productClient;

    public OrderController(ProductClient productClient) {
        this.productClient = productClient;
    }

    @GetMapping("/{productId}")
    public String placeOrder(@PathVariable Long productId) {
        Product product = productClient.getProductById(productId);
        return "Order placed for " + product.getName() + " at $" + product.getPrice();
    }
}
