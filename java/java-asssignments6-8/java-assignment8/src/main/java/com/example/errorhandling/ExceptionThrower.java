package com.example.errorhandling;

public class ExceptionThrower {
    public void throwAllThree() throws CustomExceptionA, CustomExceptionB, CustomExceptionC {
        int choice = 1;

        if (choice == 1) {
            throw new CustomExceptionA("First custom exception thrown.");
        } else if (choice == 2) {
            throw new CustomExceptionB("Second custom exception thrown.");
        } else {
            throw new CustomExceptionC("Third custom exception thrown.");
        }
    }
}
