package java_assignment.singleton;



public class Singleton {

    private String text;

    public static Singleton createObject(String value) {

        Singleton object = new Singleton();

        object.text = value;

        return object;
    }

    public void printString() {
        System.out.println("String value: " + text);
    }
}

