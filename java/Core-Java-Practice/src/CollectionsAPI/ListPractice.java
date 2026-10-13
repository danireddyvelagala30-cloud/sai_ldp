package CollectionsAPI;

import java.util.ArrayList;
import java.util.List;

public class ListPractice {

    public static void main(String[] args) {

        List<String> students = new ArrayList<>();

        students.add("Ravi");
        students.add("Rahul");
        students.add("Sita");

        System.out.println(students);

        students.remove("Rahul");

        System.out.println(students);
    }
}
