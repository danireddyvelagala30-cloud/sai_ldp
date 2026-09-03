package com.example.errorhandling;

public class Main {
    public static void main(String[] args) {
        ExceptionThrower thrower = new ExceptionThrower();

        try {
            thrower.throwAllThree();
        } catch (CustomExceptionA | CustomExceptionB | CustomExceptionC e) {
            System.out.println("Caught custom exception: " + e.getMessage());
        } finally {
            System.out.println("Finally block executed.");

            try {
                String text = null;
                System.out.println(text.length());
            } catch (NullPointerException e) {
                System.out.println("Caught NullPointerException in finally: " + e.getMessage());
            }
        }
    }
}
