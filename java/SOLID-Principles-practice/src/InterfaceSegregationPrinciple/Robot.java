package src.InterfaceSegregationPrinciple;

public class Robot implements Workable {

    @Override
    public void work() {
        System.out.println("Robot working");
    }
}
