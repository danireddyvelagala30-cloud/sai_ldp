package src.InterfaceSegregationPrinciple;

public class Human implements Workable, Eatable {

    @Override
    public void work() {
        System.out.println("Human working");
    }

    @Override
    public void eat() {
        System.out.println("Human eating");
    }
}