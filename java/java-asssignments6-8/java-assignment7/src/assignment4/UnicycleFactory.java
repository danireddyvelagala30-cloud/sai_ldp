package assignment4;

public class UnicycleFactory implements CycleFactory {
    @Override
    public Cycle create() {
        return new Unicycle();
    }
}
