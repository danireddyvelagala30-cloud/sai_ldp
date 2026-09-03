# Character Frequency Counter

This project reads a text file from the command line, counts the occurrences of each character, and writes the results to a text file in the output folder.

## Structure

- src/ - Java source files
- input/ - sample input files
- output/ - generated result files

## Run

1. Compile the Java files:
   javac src/TextFile.java src/CharacterFrequencyCounter.java -d out

2. Run the program:
   java -cp out CharacterFrequencyCounter input/sample.txt

The output report will be saved as output/sample_counts.txt.
