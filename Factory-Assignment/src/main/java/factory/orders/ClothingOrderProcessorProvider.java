package factory.orders;

public final class ClothingOrderProcessorProvider implements OrderProcessorProvider {
    @Override
    public String getCategory() {
        return "clothing";
    }

    @Override
    public OrderProcessor createProcessor() {
        return new ClothingOrderProcessor();
    }
}

final class ClothingOrderProcessor implements OrderProcessor {
    @Override
    public String process(Order order) {
        return "Processed clothing order " + order.getId() + " (" + order.getDescription()
                + "), total: " + order.getTotalAmount();
    }
}
