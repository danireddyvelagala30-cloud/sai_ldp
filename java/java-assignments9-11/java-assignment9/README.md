# Java Assignment 9

This project demonstrates a regular expression that validates whether a sentence:

- starts with a capital letter
- ends with a period

Regex used:

```java
^[A-Z].*\.$
```

- `^` = start of the string
- `[A-Z]` = first character must be an uppercase letter
- `.*` = any characters after the first
- `\.$` = must end with a period and then the end of the string

## Run

```bash
javac src/main/java/com/example/SentenceValidator.java
java -cp src/main/java com.example.SentenceValidator
```
