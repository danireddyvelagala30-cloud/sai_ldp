package com.example;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class RegexSentenceValidatorTest {

    @Test
    void validSentenceStartsWithCapitalAndEndsWithPeriod() {
        assertTrue(SentenceValidator.isValidSentence("This is a valid sentence."));
    }

    @Test
    void lowercaseStartFails() {
        assertFalse(SentenceValidator.isValidSentence("this is not valid."));
    }

    @Test
    void missingPeriodFails() {
        assertFalse(SentenceValidator.isValidSentence("This is missing a period"));
    }

    @Test
    void nullInputFails() {
        assertFalse(SentenceValidator.isValidSentence(null));
    }

    @Test
    void emptyStringFails() {
        assertFalse(SentenceValidator.isValidSentence(""));
    }

    @Test
    void singleCapitalLetterWithPeriodPasses() {
        assertTrue(SentenceValidator.isValidSentence("A."));
    }
}
