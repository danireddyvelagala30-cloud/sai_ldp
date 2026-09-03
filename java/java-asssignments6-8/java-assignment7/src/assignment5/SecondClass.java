package assignment5;

public class SecondClass extends FirstClass {
    public class InheritedInnerClass extends InnerClass {
        public InheritedInnerClass(int value) {
            super(value);
            System.out.println("Creating SecondClass.InheritedInnerClass");
        }

        public void showInheritedBehavior() {
            showValue();
            System.out.println("Inherited inner-class behavior works.");
        }
    }
}
