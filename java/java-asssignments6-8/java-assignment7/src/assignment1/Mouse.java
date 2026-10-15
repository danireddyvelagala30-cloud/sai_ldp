package assignment1;

public class Mouse extends Rodent {
    public Mouse() {
        System.out.println("Creating a Mouse");
    }

    @Override
    public void eat() {
        System.out.println("Mouse nibbles cheese.");
    }

    @Override
    public void move() {
        System.out.println("Mouse scurries quickly.");
    }

    @Override
    public void speak() {
        System.out.println("Mouse squeaks.");
    }
}
