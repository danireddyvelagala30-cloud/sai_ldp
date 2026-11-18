package factory.orders;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ServiceLoader;
import java.util.Set;

public final class OnlineOrderProcessingFactory {
    private final Map<String, OrderProcessorProvider> providers = new LinkedHashMap<>();

    public OnlineOrderProcessingFactory() {
        for (OrderProcessorProvider provider : ServiceLoader.load(OrderProcessorProvider.class)) {
            String category = normalize(provider.getCategory());
            if (category.isEmpty()) {
                throw new IllegalStateException("An order processor provider has an empty category.");
            }
            if (providers.putIfAbsent(category, provider) != null) {
                throw new IllegalStateException("More than one order processor is registered for category: " + category);
            }
        }
    }

    public OrderProcessor createProcessor(String category) {
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Order category must not be empty.");
        }

        OrderProcessorProvider provider = providers.get(normalize(category));
        if (provider == null) {
            throw new IllegalArgumentException("No order processor is registered for category: " + category);
        }
        return provider.createProcessor();
    }

    public Set<String> getSupportedCategories() {
        return Collections.unmodifiableSet(providers.keySet());
    }

    private static String normalize(String category) {
        return category.trim().toLowerCase(Locale.ROOT);
    }
}
