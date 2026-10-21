package assignment.patterns.builder;

import java.math.BigDecimal;

public final class CustomerOrder {
    private final String customerName;
    private final String product;
    private final int quantity;
    private final String deliveryAddress;
    private final String discountCode;

    private CustomerOrder(Builder builder) {
        this.customerName = builder.customerName;
        this.product = builder.product;
        this.quantity = builder.quantity;
        this.deliveryAddress = builder.deliveryAddress;
        this.discountCode = builder.discountCode;
    }

    public static Builder builder(String customerName, String product, int quantity) {
        return new Builder(customerName, product, quantity);
    }

    public BigDecimal subtotal(BigDecimal unitPrice) {
        if (unitPrice == null || unitPrice.signum() < 0) {
            throw new IllegalArgumentException("Unit price must not be null or negative");
        }
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    @Override
    public String toString() {
        return "CustomerOrder{" +
                "customerName='" + customerName + '\'' +
                ", product='" + product + '\'' +
                ", quantity=" + quantity +
                ", deliveryAddress='" + deliveryAddress + '\'' +
                ", discountCode='" + discountCode + '\'' +
                '}';
    }

    public static final class Builder {
        private final String customerName;
        private final String product;
        private final int quantity;
        private String deliveryAddress;
        private String discountCode;

        private Builder(String customerName, String product, int quantity) {
            if (customerName == null || customerName.trim().isEmpty()) {
                throw new IllegalArgumentException("Customer name must not be blank");
            }
            if (product == null || product.trim().isEmpty()) {
                throw new IllegalArgumentException("Product must not be blank");
            }
            if (quantity <= 0) {
                throw new IllegalArgumentException("Quantity must be greater than zero");
            }
            this.customerName = customerName;
            this.product = product;
            this.quantity = quantity;
        }

        public Builder deliveryAddress(String deliveryAddress) {
            if (deliveryAddress == null || deliveryAddress.trim().isEmpty()) {
                throw new IllegalArgumentException("Delivery address must not be blank");
            }
            this.deliveryAddress = deliveryAddress;
            return this;
        }

        public Builder discountCode(String discountCode) {
            if (discountCode == null || discountCode.trim().isEmpty()) {
                throw new IllegalArgumentException("Discount code must not be blank");
            }
            this.discountCode = discountCode;
            return this;
        }

        public CustomerOrder build() {
            return new CustomerOrder(this);
        }
    }
}
