package assignment1;

public abstract class Rodent {
    public Rodent() {
        System.out.println("Creating a Rodent");
    }

    public abstract void eat();
    public abstract void move();
    public abstract void speak();
}
