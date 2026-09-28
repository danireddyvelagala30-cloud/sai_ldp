package com.example.repository;

import com.example.model.Student;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class StudentRepository {

    private final AtomicLong idGenerator = new AtomicLong(3);
    private final List<Student> students = new ArrayList<>(List.of(
            new Student(1L, "Anita Sharma", "anita@example.com", 21),
            new Student(2L, "Rahul Kumar", "rahul@example.com", 22)
    ));

    public List<Student> findAll() {
        return new ArrayList<>(students);
    }

    public Student save(Student student) {
        student.setId(idGenerator.getAndIncrement());
        students.add(student);
        return student;
    }
}
