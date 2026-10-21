package assignment.patterns.singleton;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public enum AppConfig {
    INSTANCE;

    private final ConcurrentMap<String, String> settings = new ConcurrentHashMap<>();

    AppConfig() {
        settings.put("application.name", "Online Store");
        settings.put("currency", "USD");
    }

    public String get(String key) {
        return settings.get(key);
    }

    public void set(String key, String value) {
        if (key == null || key.trim().isEmpty()) {
            throw new IllegalArgumentException("Setting key must not be blank");
        }
        if (value == null) {
            throw new IllegalArgumentException("Setting value must not be null");
        }
        settings.put(key, value);
    }
}
