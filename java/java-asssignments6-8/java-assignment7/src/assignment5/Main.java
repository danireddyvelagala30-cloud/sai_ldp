package assignment5;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Assignment 5: Inner-Class Inheritance ===");
        FirstClass first = new FirstClass();
        FirstClass.InnerClass inner = first.new InnerClass(10);
        inner.showValue();

        SecondClass second = new SecondClass();
        SecondClass.InheritedInnerClass inherited = second.new InheritedInnerClass(20);
        inherited.showInheritedBehavior();
    }
}
