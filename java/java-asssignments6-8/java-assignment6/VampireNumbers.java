import java.util.Arrays;

public class VampireNumbers {

    public static boolean isVampire(int number) {

        String numberString = String.valueOf(number);

        if (numberString.length() % 2 != 0) {
            return false;
        }

        int half = numberString.length() / 2;

        int start = (int) Math.pow(10, half - 1);
        int end = (int) Math.pow(10, half) - 1;

        for (int x = start; x <= end; x++) {

            if (number % x != 0) {
                continue;
            }

            int y = number / x;

            if (y < start || y > end) {
                continue;
            }

            if (x % 10 == 0 && y % 10 == 0) {
                continue;
            }

            if (haveSameDigits(number, x, y)) {
                return true;
            }
        }

        return false;
    }

    public static boolean haveSameDigits(int number, int x, int y) {

        char[] original = String.valueOf(number).toCharArray();

        String combined = String.valueOf(x) + String.valueOf(y);
        char[] factors = combined.toCharArray();

        Arrays.sort(original);
        Arrays.sort(factors);

        return Arrays.equals(original, factors);
    }

    public static void main(String[] args) {

        int count = 0;
        int number = 1000;

        while (count < 100) {

            if (isVampire(number)) {
                System.out.println((count + 1) + ": " + number);
                count++;
            }

            number++;
        }
    }
}
