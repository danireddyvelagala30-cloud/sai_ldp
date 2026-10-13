package Strings;

public class StringPractice {
    String name = "Java Programming";

    public static void main(String[] args) {
        StringPractice sp = new StringPractice();
        System.out.println(sp.name.length());
        System.out.println(sp.name.toUpperCase());
        System.out.println(sp.name.toLowerCase());
        System.out.println(sp.name.charAt(0));
        System.out.println(sp.name.contains("Java"));
        System.out.println(sp.name.startsWith("Java"));
        System.out.println(sp.name.endsWith("Programming"));
    }
}
