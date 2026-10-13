package src.RegEx;

public class RegexPractice {
    public static void main(String[] args) {
        String email = "test@gmail.com";
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

        System.out.println(email.matches(regex));
    }
}
