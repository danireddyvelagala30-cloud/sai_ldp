package factory.calculator;

public final class ProgrammerCalculatorFactory extends CalculatorFactory {
    @Override
    protected Calculator createCalculator() {
        return new ProgrammerCalculator();
    }
}

final class ProgrammerCalculator implements Calculator {
    @Override
    public String calculate(String operation, String... operands) {
        String normalizedOperation = CalculatorSupport.normalizeOperation(operation);
        switch (normalizedOperation) {
            case "not":
                CalculatorSupport.requireOperandCount(normalizedOperation, operands, 1);
                return Integer.toString(~CalculatorSupport.parseInteger(operands[0]));
            case "binary":
            case "octal":
            case "hex":
                CalculatorSupport.requireOperandCount(normalizedOperation, operands, 1);
                int value = CalculatorSupport.parseInteger(operands[0]);
                if ("binary".equals(normalizedOperation)) {
                    return Integer.toBinaryString(value);
                }
                if ("octal".equals(normalizedOperation)) {
                    return Integer.toOctalString(value);
                }
                return Integer.toHexString(value);
            case "and":
            case "or":
            case "xor":
            case "shiftleft":
            case "shiftright":
            case "unsignedshiftright":
                CalculatorSupport.requireOperandCount(normalizedOperation, operands, 2);
                int left = CalculatorSupport.parseInteger(operands[0]);
                int right = CalculatorSupport.parseInteger(operands[1]);
                if ("and".equals(normalizedOperation)) {
                    return Integer.toString(left & right);
                }
                if ("or".equals(normalizedOperation)) {
                    return Integer.toString(left | right);
                }
                if ("xor".equals(normalizedOperation)) {
                    return Integer.toString(left ^ right);
                }
                if (right < 0 || right > 31) {
                    throw new IllegalArgumentException("Shift distance must be between 0 and 31.");
                }
                if ("shiftleft".equals(normalizedOperation)) {
                    return Integer.toString(left << right);
                }
                if ("shiftright".equals(normalizedOperation)) {
                    return Integer.toString(left >> right);
                }
                return Integer.toString(left >>> right);
            default:
                throw new IllegalArgumentException("Unsupported programmer operation: " + operation);
        }
    }
}
