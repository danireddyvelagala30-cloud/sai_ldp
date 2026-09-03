# Java Assignment 7

Five standalone exercises demonstrating inheritance, access control, interfaces, factories, and inner classes.

## Structure

```text
java-assignment7/
|-- src/
|   |-- assignment1/  Rodent inheritance
|   |-- assignment2/  Cycle inheritance and downcasting
|   |-- assignment3/  Combined interfaces
|   |-- assignment4/  Cycle factories
|   `-- assignment5/  Inner-class inheritance
|-- out/              Generated .class files
`-- README.md
```

## Requirements

- Java Development Kit (JDK) 8 or newer

## Compile

From this folder:

```text
javac -d out (Get-ChildItem -Recurse -Filter *.java src).FullName
```

## Run all exercises

```text
java -cp out assignment1.Main
java -cp out assignment2.Main
java -cp out assignment3.Main
java -cp out assignment4.Main
java -cp out assignment5.Main
```

Each assignment is independent and can also be run from an IDE by opening its `Main.java` file.
