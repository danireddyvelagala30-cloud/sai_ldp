package factory.orders;

public final class Order {
    private final String id;
    private final String category;
    private final String description;
    private final double totalAmount;

    public Order(String id, String category, String description, double totalAmount) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Order id must not be empty.");
        }
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Order category must not be empty.");
        }
        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Order description must not be empty.");
        }
        if (!Double.isFinite(totalAmount) || totalAmount < 0) {
            throw new IllegalArgumentException("Order total must be a finite, non-negative amount.");
        }

        this.id = id;
        this.category = category;
        this.description = description;
        this.totalAmount = totalAmount;
    }

    public String getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
}
