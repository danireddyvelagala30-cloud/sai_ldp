package assignment1;

public class Hamster extends Rodent {
    public Hamster() {
        System.out.println("Creating a Hamster");
    }

    @Override
    public void eat() {
        System.out.println("Hamster munches grain.");
    }

    @Override
    public void move() {
        System.out.println("Hamster waddles through its bedding.");
    }

    @Override
    public void speak() {
        System.out.println("Hamster squeaks softly.");
    }
}
