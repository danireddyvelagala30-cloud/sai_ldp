package factory.calculator;

public final class BasicCalculatorFactory extends CalculatorFactory {
    @Override
    protected Calculator createCalculator() {
        return new BasicCalculator();
    }
}

final class BasicCalculator implements Calculator {
    @Override
    public String calculate(String operation, String... operands) {
        String normalizedOperation = CalculatorSupport.normalizeOperation(operation);
        CalculatorSupport.requireOperandCount(normalizedOperation, operands, 2);
        double left = CalculatorSupport.parseDouble(operands[0]);
        double right = CalculatorSupport.parseDouble(operands[1]);

        switch (normalizedOperation) {
            case "add":
            case "+":
                return CalculatorSupport.format(left + right);
            case "subtract":
            case "-":
                return CalculatorSupport.format(left - right);
            case "multiply":
            case "*":
                return CalculatorSupport.format(left * right);
            case "divide":
            case "/":
                if (right == 0) {
                    throw new IllegalArgumentException("Cannot divide by zero.");
                }
                return CalculatorSupport.format(left / right);
            default:
                throw new IllegalArgumentException("Unsupported basic operation: " + operation);
        }
    }
}
