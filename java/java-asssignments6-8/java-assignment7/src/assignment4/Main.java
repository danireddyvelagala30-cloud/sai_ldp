package assignment4;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Assignment 4: Cycle Factories ===");
        CycleFactory[] factories = {
            new UnicycleFactory(),
            new BicycleFactory(),
            new TricycleFactory()
        };

        for (CycleFactory factory : factories) {
            Cycle cycle = factory.create();
            cycle.ride();
        }
    }
}
