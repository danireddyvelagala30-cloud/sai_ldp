import java.io.File;
import java.util.Scanner;
import java.util.regex.Pattern;

public class RegexFileSearch {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        String homeDirectory = System.getProperty("user.home");
        File home = new File(homeDirectory);

        System.out.println("Home Directory: " + home.getAbsolutePath());
        System.out.println("Enter a regular expression to search for files.");
        System.out.println("Type 'exit' to stop the program.");

        while (true) {

            System.out.print("\nEnter regex: ");
            String regex = scanner.nextLine();

            if (regex.equalsIgnoreCase("exit")) {
                System.out.println("Program terminated.");
                break;
            }

            try {
                Pattern pattern = Pattern.compile(regex);

                System.out.println("\nMatching files:");

                searchFiles(home, pattern);

            } catch (Exception e) {
                System.out.println("Invalid regular expression: " + e.getMessage());
            }
        }

        scanner.close();
    }

    public static void searchFiles(File directory, Pattern pattern) {

        File[] files = directory.listFiles();

        if (files == null) {
            return;
        }

        for (File file : files) {

            if (file.isDirectory()) {
                searchFiles(file, pattern);
            } 
            else if (pattern.matcher(file.getName()).matches()) {
                System.out.println(file.getAbsolutePath());
            }
        }
    }
}