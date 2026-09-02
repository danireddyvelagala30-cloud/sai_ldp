package src.Iterator;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorPractice {

    public static void main(String[] args) {

        List<String> students = new ArrayList<>();

        students.add("Ravi");
        students.add("Rahul");
        students.add("Sita");

        Iterator<String> iterator = students.iterator();

        while (iterator.hasNext()) {

            String student = iterator.next();

            System.out.println(student);
        }
    }
}