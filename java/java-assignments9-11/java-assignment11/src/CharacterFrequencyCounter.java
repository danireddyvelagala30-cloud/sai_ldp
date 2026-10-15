import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;

public class CharacterFrequencyCounter {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java CharacterFrequencyCounter <input-file>");
            return;
        }

        String inputFile = args[0];

        try {
            String content = TextFile.read(inputFile);
            Map<Character, Integer> counts = new TreeMap<>();

            for (char ch : content.toCharArray()) {
                counts.put(ch, counts.getOrDefault(ch, 0) + 1);
            }

            StringBuilder report = new StringBuilder();
            report.append("Character Frequency Report\n");
            report.append("==========================\n");

            for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
                report.append(formatCharacter(entry.getKey()))
                        .append(" -> ")
                        .append(entry.getValue())
                        .append(System.lineSeparator());
            }

            String outputFile = "output/" + getBaseName(inputFile) + "_counts.txt";
            TextFile.write(outputFile, report.toString());

            System.out.println("Character counts saved to " + outputFile);
            System.out.print(report);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    private static String formatCharacter(char ch) {
        switch (ch) {
            case '\n':
                return "\\n";
            case '\r':
                return "\\r";
            case '\t':
                return "\\t";
            case ' ':
                return "[space]";
            default:
                return String.valueOf(ch);
        }
    }

    private static String getBaseName(String fileName) {
        String normalized = fileName.replace('\\', '/');
        int lastSlash = normalized.lastIndexOf('/');
        String file = lastSlash >= 0 ? normalized.substring(lastSlash + 1) : normalized;
        int dotIndex = file.lastIndexOf('.');
        return dotIndex > 0 ? file.substring(0, dotIndex) : file;
    }
}
