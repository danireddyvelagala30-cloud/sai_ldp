package HashSet;

import java.util.HashSet;
import java.util.Set;

public class HashSetPractice {

    public static void main(String[] args) {

        Set<String> students = new HashSet<>();

        students.add("Ravi");
        students.add("Rahul");
        students.add("Ravi");
        students.add("Sita");

        System.out.println(students);
    }
}
