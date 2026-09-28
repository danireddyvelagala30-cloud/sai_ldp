package com.example.dto.service;

import com.example.dto.dto.StudentRequestDTO;
import com.example.dto.dto.StudentResponseDTO;
import com.example.dto.entity.Student;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(0);

    public StudentService() {
        students.add(new Student(idGenerator.incrementAndGet(),
                "Anita", "anita@example.com", "Java"));
        students.add(new Student(idGenerator.incrementAndGet(),
                "Rahul", "rahul@example.com", "Spring Boot"));
    }

    public List<StudentResponseDTO> getAllStudents() {
        return students.stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public StudentResponseDTO getStudentById(Long id) {
        return toResponseDTO(findStudent(id));
    }

    public StudentResponseDTO createStudent(StudentRequestDTO request) {
        Student student = new Student(
                idGenerator.incrementAndGet(),
                request.getName(),
                request.getEmail(),
                request.getCourse()
        );
        students.add(student);
        return toResponseDTO(student);
    }

    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO request) {
        Student student = findStudent(id);
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setCourse(request.getCourse());
        return toResponseDTO(student);
    }

    public void deleteStudent(Long id) {
        students.remove(findStudent(id));
    }

    private Student findStudent(Long id) {
        return students.stream()
                .filter(student -> student.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found with id: " + id));
    }

    private StudentResponseDTO toResponseDTO(Student student) {
        return new StudentResponseDTO(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getCourse()
        );
    }
}
