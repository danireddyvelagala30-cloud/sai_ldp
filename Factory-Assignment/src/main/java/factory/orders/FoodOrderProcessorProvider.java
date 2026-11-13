package factory.orders;

public final class FoodOrderProcessorProvider implements OrderProcessorProvider {
    @Override
    public String getCategory() {
        return "food";
    }

    @Override
    public OrderProcessor createProcessor() {
        return new FoodOrderProcessor();
    }
}

final class FoodOrderProcessor implements OrderProcessor {
    @Override
    public String process(Order order) {
        return "Processed food order " + order.getId() + " (" + order.getDescription()
                + "), total: " + order.getTotalAmount();
    }
}
