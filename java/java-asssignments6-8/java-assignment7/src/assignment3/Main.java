package assignment3;

public class Main {
    private static void useOne(InterfaceOne value) {
        System.out.println("Using InterfaceOne:");
        value.oneFirst();
        value.oneSecond();
    }

    private static void useTwo(InterfaceTwo value) {
        System.out.println("Using InterfaceTwo:");
        value.twoFirst();
        value.twoSecond();
    }

    private static void useThree(InterfaceThree value) {
        System.out.println("Using InterfaceThree:");
        value.threeFirst();
        value.threeSecond();
    }

    private static void useCombined(CombinedInterface value) {
        System.out.println("Using CombinedInterface:");
        value.combinedMethod();
    }

    public static void main(String[] args) {
        System.out.println("=== Assignment 3: Combined Interfaces ===");
        MultiInterfaceClass object = new MultiInterfaceClass();
        object.baseMethod();
        useOne(object);
        useTwo(object);
        useThree(object);
        useCombined(object);
    }
}
