import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class singletonassignment {
    public static void main(String[] args) {
        AppLogger logger = AppLogger.INSTANCE;
        logger.log("Singleton practice started");

        DriverRegistry drivers = DriverRegistry.getInstance();
        drivers.register(new DatabaseDriver("Example JDBC driver"));
        logger.log("Registered driver: " + drivers.find("Example JDBC driver").getName());


        AppCache cache = AppCache.getInstance();
        cache.put("welcome", "Hello from the cache");
        logger.log(cache.get("welcome"));


        AppThreadPool threadPool = AppThreadPool.getInstance();
        threadPool.submit(() -> logger.log("Task executed by the shared thread pool"));
        threadPool.shutdown();
    }

    enum AppLogger {
        INSTANCE;

        void log(String message) {
            System.out.println("[app] " + message);
        }
    }

    static final class DatabaseDriver {
        private final String name;

        DatabaseDriver(String name) {
            this.name = name;
        }

        String getName() {
            return name;
        }
    }

    static final class DriverRegistry {
        private static class Holder {
            private static final DriverRegistry INSTANCE = new DriverRegistry();
        }

        private final Map<String, DatabaseDriver> drivers = new ConcurrentHashMap<>();

        private DriverRegistry() {
        }

        static DriverRegistry getInstance() {
            return Holder.INSTANCE;
        }

        void register(DatabaseDriver driver) {
            drivers.put(driver.getName(), driver);
        }

        DatabaseDriver find(String name) {
            return drivers.get(name);
        }
    }

    static final class AppCache {
        private static class Holder {
            private static final AppCache INSTANCE = new AppCache();
        }

        private final Map<String, String> values = new ConcurrentHashMap<>();

        private AppCache() {
        }

        static AppCache getInstance() {
            return Holder.INSTANCE;
        }

        void put(String key, String value) {
            values.put(key, value);
        }

        String get(String key) {
            return values.get(key);
        }
    }

    static final class AppThreadPool {
        private static class Holder {
            private static final AppThreadPool INSTANCE = new AppThreadPool();
        }

        private final ExecutorService executor = Executors.newFixedThreadPool(2);

        private AppThreadPool() {
        }

        static AppThreadPool getInstance() {
            return Holder.INSTANCE;
        }

        void submit(Runnable task) {
            executor.submit(task);
        }

        void shutdown() {
            executor.shutdown();
            try {
                if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                    executor.shutdownNow();
                }
            } catch (InterruptedException exception) {
                executor.shutdownNow();
                Thread.currentThread().interrupt();
            }
        }
    }
}
