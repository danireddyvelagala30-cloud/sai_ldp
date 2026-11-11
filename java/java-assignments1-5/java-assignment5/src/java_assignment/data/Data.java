package java_assignment.data;



public class Data {

    int number;
    char character;

    public void printInstanceVariables() {
        System.out.println("Integer value: " + number);
        System.out.println("Character value: " + character);
    }

    public void printLocalVariables() {

        /*
         * Local variables must be initialized before they are read in Java.
         * The following code does not compile because Java does not provide
         * default values for local variables:
         *
         * int localNumber;
         * char localCharacter;
         * System.out.println(localNumber);
         * System.out.println(localCharacter);
         */
        int localNumber = 0;
        char localCharacter = '\u0000';

        System.out.println("Local integer value: " + localNumber);
        System.out.println("Local character value: " + localCharacter);
    }
}

