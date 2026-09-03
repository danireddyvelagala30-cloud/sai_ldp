package com.assignment;

import com.assignment.student.Student;
import com.assignment.student.StudentService;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Student> students = List.of(
                new Student(111, "Jiya Brein", 17, "Female", "Computer Science", 2018, 70.8),
                new Student(122, "Paul Niksui", 18, "Male", "Mechanical", 2016, 50.2),
                new Student(133, "Martin Theron", 17, "Male", "Electronic", 2017, 90.3),
                new Student(144, "Murali Gowda", 18, "Male", "Electrical", 2018, 80),
                new Student(155, "Nima Roy", 19, "Female", "Textile", 2016, 70),
                new Student(166, "Iqbal Hussain", 18, "Male", "Security", 2016, 70),
                new Student(177, "Manu Sharma", 16, "Male", "Chemical", 2018, 70),
                new Student(188, "Wang Liu", 20, "Male", "Computer Science", 2015, 80),
                new Student(199, "Amelia Zoe", 18, "Female", "Computer Science", 2016, 85),
                new Student(200, "Jaden Dough", 18, "Male", "Security", 2015, 82),
                new Student(211, "Jasna Kaur", 20, "Female", "Electronic", 2019, 83),
                new Student(222, "Nitin Joshi", 19, "Male", "Textile", 2016, 60.4),
                new Student(233, "Jyothi Reddy", 16, "Female", "Computer Science", 2015, 45.6),
                new Student(244, "Nicolus Den", 16, "Male", "Electronic", 2017, 95.8),
                new Student(255, "Ali Baig", 17, "Male", "Electronic", 2018, 88.4),
                new Student(266, "Sanvi Pandey", 17, "Female", "Electric", 2019, 72.4),
                new Student(277, "Anuj Chettiar", 18, "Male", "Computer Science", 2017, 57.5)
        );

        StudentService studentService = new StudentService(students);

        System.out.println("1. Departments in the college:");
        System.out.println(studentService.getAllDepartments());

        System.out.println("\n2. Students enrolled after 2018:");
        System.out.println(studentService.getStudentsEnrolledAfter2018());

        System.out.println("\n3. Male students in Computer Science:");
        System.out.println(studentService.getMaleStudentsInComputerScience());

        System.out.println("\n4. Count of male and female students:");
        System.out.println(studentService.countStudentsByGender());

        System.out.println("\n5. Average age of male and female students:");
        System.out.println(studentService.averageAgeByGender());

        System.out.println("\n6. Student with highest percentage:");
        System.out.println(studentService.getHighestPercentageStudent().orElse(null));

        System.out.println("\n7. Number of students in each department:");
        System.out.println(studentService.countStudentsByDepartment());

        System.out.println("\n8. Average percentage in each department:");
        System.out.println(studentService.averagePercentageByDepartment());

        System.out.println("\n9. Youngest male student in Electronic department:");
        System.out.println(studentService.getYoungestMaleInElectronicDepartment().orElse(null));

        System.out.println("\n10. Male and female students in Computer Science:");
        System.out.println(studentService.countStudentsByGenderInComputerScience());
    }
}
