package factory.calculator;

import java.util.Locale;

final class CalculatorSupport {
    private CalculatorSupport() {
    }

    static String normalizeOperation(String operation) {
        if (operation == null || operation.trim().isEmpty()) {
            throw new IllegalArgumentException("Operation must not be empty.");
        }
        return operation.trim().toLowerCase(Locale.ROOT);
    }

    static void requireOperandCount(String operation, String[] operands, int expected) {
        if (operands == null || operands.length != expected) {
            throw new IllegalArgumentException(operation + " requires " + expected + " operand(s).");
        }
    }

    static double parseDouble(String operand) {
        try {
            double value = Double.parseDouble(operand);
            if (!Double.isFinite(value)) {
                throw new IllegalArgumentException("Operand must be a finite number: " + operand);
            }
            return value;
        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException("Invalid number: " + operand, exception);
        }
    }

    static int parseInteger(String operand) {
        try {
            return Integer.parseInt(operand);
        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException("Invalid 32-bit integer: " + operand, exception);
        }
    }

    static String format(double value) {
        if (!Double.isFinite(value)) {
            throw new IllegalArgumentException("The result is not a finite number.");
        }
        return Double.toString(value);
    }
}
