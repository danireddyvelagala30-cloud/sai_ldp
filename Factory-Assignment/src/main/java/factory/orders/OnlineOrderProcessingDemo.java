package factory.orders;

import java.util.Arrays;
import java.util.Collection;

public final class OnlineOrderProcessingDemo {
    private OnlineOrderProcessingDemo() {
    }

    public static void main(String[] args) {
        OnlineOrderProcessingFactory factory = new OnlineOrderProcessingFactory();
        if (factory.getSupportedCategories().isEmpty()) {
            throw new IllegalStateException("No order processor providers are registered.");
        }

        Collection<String> categories = args.length == 0
                ? factory.getSupportedCategories()
                : Arrays.asList(args);

        for (String category : categories) {
            Order order = new Order("ORD-001", category, "Sample " + category + " order", 49.99);
            OrderProcessor processor = factory.createProcessor(category);
            System.out.println(processor.process(order));
        }
    }
}
