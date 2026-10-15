package assignment1;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Assignment 1: Rodent Hierarchy ===");
        Rodent[] rodents = {new Mouse(), new Gerbil(), new Hamster()};

        for (Rodent rodent : rodents) {
            rodent.eat();
            rodent.move();
            rodent.speak();
            System.out.println();
        }
    }
}
