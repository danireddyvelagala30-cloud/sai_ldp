package HashMap;

import java.util.HashMap;
import java.util.Map;

public class HashMapPractice {

    public static void main(String[] args) {

        Map<Integer, String> students = new HashMap<>();

        students.put(101, "Ravi");
        students.put(102, "Rahul");
        students.put(103, "Sita");

        System.out.println(students);

        System.out.println(students.get(101));

        students.remove(102);

        System.out.println(students);
    }
}
