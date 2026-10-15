import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class TextFile {
    public static String read(String fileName) throws IOException {
        Path path = Paths.get(fileName);
        return Files.readString(path, StandardCharsets.UTF_8);
    }

    public static void write(String fileName, String content) throws IOException {
        Path path = Paths.get(fileName);
        Path parent = path.getParent();
        if (parent != null) {
            Files.createDirectories(parent);
        }

        Files.writeString(
                path,
                content,
                StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING,
                StandardOpenOption.WRITE
        );
    }
}
