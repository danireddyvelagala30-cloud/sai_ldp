package assignment5;

public class FirstClass {
    public class InnerClass {
        private final int value;

        public InnerClass(int value) {
            this.value = value;
            System.out.println("Creating FirstClass.InnerClass with value " + value);
        }

        public void showValue() {
            System.out.println("Inner value: " + value);
        }
    }
}
