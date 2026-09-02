package src.Lambda;

public class LambdaPractice {
    interface Calculator {
        int add(int a, int b);
    }

    public static void main(String[] args) {

        Calculator calculator = (a, b) -> a + b;

        System.out.println(calculator.add(10, 20));
    }
}
