package factory.calculator;

import java.util.Locale;

public final class CalculatorDemo {
    private CalculatorDemo() {
    }

    public static void main(String[] args) {
        if (args.length == 0) {
            showBasic();
            showScientific();
            showProgrammer();
            return;
        }
        if (args.length > 1) {
            throw new IllegalArgumentException("Choose one calculator mode: basic, scientific, or programmer.");
        }

        switch (args[0].toLowerCase(Locale.ROOT)) {
            case "basic":
                showBasic();
                break;
            case "scientific":
                showScientific();
                break;
            case "programmer":
                showProgrammer();
                break;
            default:
                throw new IllegalArgumentException("Unknown calculator mode: " + args[0]);
        }
    }

    private static void showBasic() {
        Calculator calculator = new BasicCalculatorFactory().getCalculator();
        System.out.println("Basic: 12 + 8 = " + calculator.calculate("add", "12", "8"));
    }

    private static void showScientific() {
        Calculator calculator = new ScientificCalculatorFactory().getCalculator();
        System.out.println("Scientific: sqrt(81) = " + calculator.calculate("sqrt", "81"));
    }

    private static void showProgrammer() {
        Calculator calculator = new ProgrammerCalculatorFactory().getCalculator();
        System.out.println("Programmer: 12 AND 10 = " + calculator.calculate("and", "12", "10"));
    }
}
