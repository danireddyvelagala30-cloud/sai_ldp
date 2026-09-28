package com.example.lombok;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
public class StudentService {

    public Student registerStudent() {
        Student student = Student.builder()
                .id(1L)
                .name("Anita")
                .email("anita@example.com")
                .address(Address.builder()
                        .city("Bengaluru")
                        .state("Karnataka")
                        .country("India")
                        .build())
                .skills(List.of("Java", "Spring", "Hibernate"))
                .build();

        log.info("Registered student: {}", student.getName());
        return student;
    }
}
