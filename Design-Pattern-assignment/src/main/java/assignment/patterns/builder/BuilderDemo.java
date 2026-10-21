package assignment.patterns.builder;

import java.math.BigDecimal;

public final class BuilderDemo {
    private BuilderDemo() {
    }

    public static void main(String[] args) {
        CustomerOrder order = CustomerOrder.builder("Avery", "Wireless Headphones", 2)
                .deliveryAddress("14 Market Street")
                .discountCode("WELCOME10")
                .build();
        System.out.println("Builder: " + order);
        System.out.println("Order subtotal = " + order.subtotal(new BigDecimal("49.99")));
    }
}
