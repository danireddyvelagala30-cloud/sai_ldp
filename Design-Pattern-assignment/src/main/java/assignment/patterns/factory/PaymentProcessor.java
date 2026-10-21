package assignment.patterns.factory;

import java.math.BigDecimal;

public interface PaymentProcessor {
    String pay(BigDecimal amount);
}
