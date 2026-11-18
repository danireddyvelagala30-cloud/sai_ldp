package factory.orders;

public interface OrderProcessorProvider {
    String getCategory();

    OrderProcessor createProcessor();
}
