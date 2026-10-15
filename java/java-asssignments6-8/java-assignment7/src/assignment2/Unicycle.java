package assignment2;

public class Unicycle extends Cycle {
    public Unicycle() {
        System.out.println("Creating a Unicycle");
    }

    @Override
    public void ride() {
        System.out.println("Riding a unicycle.");
    }

    public void balance() {
        System.out.println("Balancing on a unicycle.");
    }
}
