package com.example.hibernate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentDao studentDao = new StudentDao();

    @PostMapping
    public ResponseEntity<Student> create(@RequestBody StudentRequest request) {
        Student student = new Student(request.name(), request.email(), request.course());
        Long id = studentDao.create(student);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(studentDao.findById(id).orElseThrow());
    }

    @GetMapping
    public List<Student> findAll() {
        return studentDao.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findById(@PathVariable Long id) {
        return studentDao.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(
            @PathVariable Long id,
            @RequestBody StudentRequest request) {
        return studentDao.findById(id)
                .map(student -> {
                    student.setName(request.name());
                    student.setEmail(request.email());
                    student.setCourse(request.course());
                    studentDao.update(student);
                    return ResponseEntity.ok(studentDao.findById(id).orElseThrow());
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (studentDao.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        studentDao.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleInvalidRequestBody() {
        return ResponseEntity.badRequest().body(Map.of(
                "error", "Request body is required",
                "example", "{\"name\":\"Anita\",\"email\":\"anita@example.com\",\"course\":\"Hibernate\"}"
        ));
    }

    public record StudentRequest(String name, String email, String course) {
    }
}
