package com.example.lombok;

public class LombokPracticeApplication {

    public static void main(String[] args) {
        StudentService studentService = new StudentService();
        Student student = studentService.registerStudent();

        System.out.println(student);
        System.out.println("Student email: " + student.getEmail());

        student.setEmail("anita.updated@example.com");
        System.out.println("Updated email: " + student.getEmail());

        Course course = Course.builder()
                .code("SPRING-101")
                .title("Spring and Hibernate")
                .durationInHours(40)
                .build();

        System.out.println("Course: " + course);
    }
}
