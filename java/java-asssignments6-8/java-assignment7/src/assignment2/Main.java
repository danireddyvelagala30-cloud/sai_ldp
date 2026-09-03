package assignment2;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Assignment 2: Cycle Inheritance ===");
        Cycle[] cycles = {new Unicycle(), new Bicycle(), new Tricycle()};

        for (Cycle cycle : cycles) {
            cycle.ride();
            if (cycle instanceof Unicycle) {
                ((Unicycle) cycle).balance();
            } else if (cycle instanceof Bicycle) {
                ((Bicycle) cycle).balance();
            } else {
                System.out.println("Tricycle has no balance() method.");
            }
        }

        System.out.println("A Cycle reference cannot call balance() directly because Cycle does not declare it.");
    }
}
