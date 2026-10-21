package factory.calculator;

public final class ScientificCalculatorFactory extends CalculatorFactory {
    @Override
    protected Calculator createCalculator() {
        return new ScientificCalculator();
    }
}

final class ScientificCalculator implements Calculator {
    @Override
    public String calculate(String operation, String... operands) {
        String normalizedOperation = CalculatorSupport.normalizeOperation(operation);
        switch (normalizedOperation) {
            case "sqrt":
                CalculatorSupport.requireOperandCount(normalizedOperation, operands, 1);
                double value = CalculatorSupport.parseDouble(operands[0]);
                if (value < 0) {
                    throw new IllegalArgumentException("Square root requires a non-negative operand.");
                }
                return CalculatorSupport.format(Math.sqrt(value));
            case "pow":
                CalculatorSupport.requireOperandCount(normalizedOperation, operands, 2);
                return CalculatorSupport.format(Math.pow(
                        CalculatorSupport.parseDouble(operands[0]),
                        CalculatorSupport.parseDouble(operands[1])));
            case "sin":
            case "cos":
            case "tan":
                CalculatorSupport.requireOperandCount(normalizedOperation, operands, 1);
                double radians = Math.toRadians(CalculatorSupport.parseDouble(operands[0]));
                if ("sin".equals(normalizedOperation)) {
                    return CalculatorSupport.format(Math.sin(radians));
                }
                if ("cos".equals(normalizedOperation)) {
                    return CalculatorSupport.format(Math.cos(radians));
                }
                return CalculatorSupport.format(Math.tan(radians));
            default:
                throw new IllegalArgumentException("Unsupported scientific operation: " + operation);
        }
    }
}
