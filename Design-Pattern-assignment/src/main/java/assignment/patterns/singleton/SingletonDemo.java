package assignment.patterns.singleton;

public final class SingletonDemo {
    private SingletonDemo() {
    }

    public static void main(String[] args) {
        AppConfig firstReference = AppConfig.INSTANCE;
        AppConfig secondReference = AppConfig.INSTANCE;
        firstReference.set("store.region", "North America");
        System.out.println("Singleton: same instance = " + (firstReference == secondReference));
        System.out.println("Store region = " + secondReference.get("store.region"));
    }
}
