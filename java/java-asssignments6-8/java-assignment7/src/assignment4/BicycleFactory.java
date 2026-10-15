package assignment4;

public class BicycleFactory implements CycleFactory {
    @Override
    public Cycle create() {
        return new Bicycle();
    }
}
