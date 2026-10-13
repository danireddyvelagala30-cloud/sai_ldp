package com.example;

import java.util.regex.Pattern;

public class SentenceValidator {
    private static final Pattern SENTENCE_PATTERN = Pattern.compile("^[A-Z].*\\.$");

    public static boolean isValidSentence(String input) {
        if (input == null) {
            return false;
        }
        return SENTENCE_PATTERN.matcher(input).matches();
    }

    public static void main(String[] args) {
        String example = "This is a valid sentence.";
        System.out.println("Sentence: " + example);
        System.out.println("Valid? " + isValidSentence(example));
    }
}
