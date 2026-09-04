
import java.util.Scanner;

public class AlphabetChecker {

    public static boolean containsAllLetters(String input) {


        boolean[] found = new boolean[26];

        for (char ch : input.toLowerCase().toCharArray()) {


            if (ch >= 'a' && ch <= 'z') {
                int index = ch - 'a';
                found[index] = true;
            }
        }

        for (boolean letterFound : found) {
            if (!letterFound) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String input = scanner.nextLine();

        if (containsAllLetters(input)) {
            System.out.println("The string contains all letters from a-z.");
        } else {
            System.out.println("The string does not contain all letters from a-z.");
        }

        scanner.close();
    }

}
