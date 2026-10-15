public class ConstructorExample {

    private int number;
    private String name;

    public ConstructorExample() {

        this(100, "Java");

        System.out.println("First constructor called");
    }

    public ConstructorExample(int number, String name) {

        this.number = number;
        this.name = name;

        System.out.println("Second constructor called");
    }

    public void display() {
        System.out.println("Number: " + number);
        System.out.println("Name: " + name);
    }

    public static void main(String[] args) {

        ConstructorExample object =
                new ConstructorExample();

        object.display();
    }
}
