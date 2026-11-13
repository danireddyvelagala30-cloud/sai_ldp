package factory.calculator;

public abstract class CalculatorFactory {
    public final Calculator getCalculator() {
        return createCalculator();
    }

    protected abstract Calculator createCalculator();
}
