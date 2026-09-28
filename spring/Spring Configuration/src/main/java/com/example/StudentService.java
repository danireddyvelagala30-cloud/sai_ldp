package com.example;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private final String applicationName;

    public StudentService(@Value("${app.name}") String applicationName) {
        this.applicationName = applicationName;
    }

    public Student findStudent() {
        return new Student(101, "Ravi");
    }

    public void printStudent() {
        System.out.println("Application: " + applicationName);
        System.out.println("Student: " + findStudent());
    }
}
