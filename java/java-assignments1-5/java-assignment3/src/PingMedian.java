import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PingMedian {

    public static double pingMedian(String host, int count)
            throws IOException, InterruptedException {

        List<Double> times = new ArrayList<>();

        String[] command;

        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            command = new String[]{
                    "ping",
                    "-n",
                    String.valueOf(count),
                    host
            };
        } else {
            command = new String[]{
                    "ping",
                    "-c",
                    String.valueOf(count),
                    host
            };
        }

        ProcessBuilder processBuilder = new ProcessBuilder(command);

        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream())
        );

        String line;

        Pattern pattern = Pattern.compile(
                "time[=<]\\s*(\\d+(?:\\.\\d+)?)\\s*ms",
                Pattern.CASE_INSENSITIVE
        );

        while ((line = reader.readLine()) != null) {

            Matcher matcher = pattern.matcher(line);

            if (matcher.find()) {
                times.add(Double.parseDouble(matcher.group(1)));
            }
        }

        int exitCode = process.waitFor();

        if (times.isEmpty()) {
            throw new IOException(
                    "Could not get any successful ping response from: " + host
            );
        }

        Collections.sort(times);

        int size = times.size();

        if (size % 2 == 1) {
            return times.get(size / 2);
        } else {
            return (times.get(size / 2 - 1) + times.get(size / 2)) / 2.0;
        }
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter host to ping: ");
        String host = scanner.nextLine();

        System.out.print("Enter number of pings: ");
        int count = scanner.nextInt();

        try {

            double median = pingMedian(host, count);

            System.out.println(
                    "Median ping time for " + host + ": "
                            + median + " ms"
            );

        } catch (IOException e) {

            System.out.println("Ping failed: " + e.getMessage());

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            System.out.println("Ping process was interrupted.");
        }

        scanner.close();
    }

}

