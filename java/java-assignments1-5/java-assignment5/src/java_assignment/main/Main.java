package java_assignment.main;



import java_assignment.data.Data;
import java_assignment.singleton.Singleton;

public class Main {

    public static void main(String[] args) {

        Data data = new Data();

        System.out.println("Instance Variables:");
        data.printInstanceVariables();

        System.out.println();

        System.out.println("Local Variables:");
        data.printLocalVariables();

        System.out.println();

        Singleton singleton =
                Singleton.createObject("Hello Java");

        singleton.printString();
    }
}

