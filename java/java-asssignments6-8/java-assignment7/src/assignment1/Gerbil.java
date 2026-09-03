package assignment1;

public class Gerbil extends Rodent {
    public Gerbil() {
        System.out.println("Creating a Gerbil");
    }

    @Override
    public void eat() {
        System.out.println("Gerbil stores seeds in its cheeks.");
    }

    @Override
    public void move() {
        System.out.println("Gerbil runs on its wheel.");
    }

    @Override
    public void speak() {
        System.out.println("Gerbil chirps.");
    }
}
