package assignment2;

public class Bicycle extends Cycle {
    public Bicycle() {
        System.out.println("Creating a Bicycle");
    }

    @Override
    public void ride() {
        System.out.println("Riding a bicycle.");
    }

    public void balance() {
        System.out.println("Balancing on a bicycle.");
    }
}
