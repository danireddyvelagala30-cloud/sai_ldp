package ClassesAndObjects;

public class Student {

    String name;
    int age;
    double marks;

    void displayStudent() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Marks: " + marks);
    }

    public static void main(String[] args) {

        Student student = new Student();

        student.name = "Ravi";
        student.age = 21;
        student.marks = 85.5;

        student.displayStudent();
    }
}
