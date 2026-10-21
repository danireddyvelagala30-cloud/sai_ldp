package assignment.patterns.factory;

import java.math.BigDecimal;

public final class FactoryDemo {
    private FactoryDemo() {
    }

    public static void main(String[] args) {
        PaymentProcessor processor = PaymentProcessorFactory.create(
                PaymentProcessorFactory.PaymentMethod.PAYPAL);
        System.out.println("Factory: " + processor.pay(new BigDecimal("99.98")));
    }
}
