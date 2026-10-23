import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class KYCForm {

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public static String getKycRange(String signupDate, String currentDate) {

        LocalDate signup = LocalDate.parse(signupDate, FORMATTER);
        LocalDate today = LocalDate.parse(currentDate, FORMATTER);

        if (signup.isAfter(today)) {
            return "No range";
        }

        LocalDate anniversary = signup.withYear(today.getYear());

        if (anniversary.isBefore(today.minusDays(30))) {
            anniversary = anniversary.plusYears(1);
        }

        if (anniversary.isAfter(today.plusDays(30))) {
            return "No range";
        }

        LocalDate startDate = anniversary.minusDays(30);

        LocalDate endDate = anniversary.plusDays(30);

        if (endDate.isAfter(today)) {
            endDate = today;
        }

        if (startDate.isAfter(today)) {
            return "No range";
        }

        return startDate.format(FORMATTER)
                + " "
                + endDate.format(FORMATTER);
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int n = Integer.parseInt(scanner.nextLine());

        for (int i = 0; i < n; i++) {

            String[] dates = scanner.nextLine().split(" ");

            String signupDate = dates[0];
            String currentDate = dates[1];

            System.out.println(
                    getKycRange(signupDate, currentDate)
            );
        }

        scanner.close();
    }
}

