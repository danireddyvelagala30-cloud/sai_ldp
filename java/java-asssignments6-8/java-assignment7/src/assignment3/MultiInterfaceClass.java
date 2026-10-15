package assignment3;

public class MultiInterfaceClass extends ConcreteBase implements CombinedInterface {
    @Override
    public void oneFirst() {
        System.out.println("InterfaceOne.oneFirst() called.");
    }

    @Override
    public void oneSecond() {
        System.out.println("InterfaceOne.oneSecond() called.");
    }

    @Override
    public void twoFirst() {
        System.out.println("InterfaceTwo.twoFirst() called.");
    }

    @Override
    public void twoSecond() {
        System.out.println("InterfaceTwo.twoSecond() called.");
    }

    @Override
    public void threeFirst() {
        System.out.println("InterfaceThree.threeFirst() called.");
    }

    @Override
    public void threeSecond() {
        System.out.println("InterfaceThree.threeSecond() called.");
    }

    @Override
    public void combinedMethod() {
        System.out.println("CombinedInterface.combinedMethod() called.");
    }
}
