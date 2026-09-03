package assignment4;

public class TricycleFactory implements CycleFactory {
    @Override
    public Cycle create() {
        return new Tricycle();
    }
}
