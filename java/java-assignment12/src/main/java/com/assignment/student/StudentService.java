package com.assignment.student;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class StudentService {

    private final List<Student> students;

    public StudentService(List<Student> students) {
        this.students = students;
    }

    public Set<String> getAllDepartments() {
        return students.stream()
                .map(Student::getEngDepartment)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    public List<String> getStudentsEnrolledAfter2018() {
        return students.stream()
                .filter(student -> student.getYearOfEnrollment() > 2018)
                .map(Student::getName)
                .toList();
    }

    public List<Student> getMaleStudentsInComputerScience() {
        return students.stream()
                .filter(student -> "Male".equalsIgnoreCase(student.getGender()))
                .filter(student -> "Computer Science".equals(student.getEngDepartment()))
                .toList();
    }

    public Map<String, Long> countStudentsByGender() {
        return students.stream()
                .collect(Collectors.groupingBy(Student::getGender, LinkedHashMap::new, Collectors.counting()));
    }

    public Map<String, Double> averageAgeByGender() {
        return students.stream()
                .collect(Collectors.groupingBy(
                        Student::getGender,
                        LinkedHashMap::new,
                        Collectors.averagingInt(Student::getAge)
                ));
    }

    public Optional<Student> getHighestPercentageStudent() {
        return students.stream()
                .max(Comparator.comparingDouble(Student::getPerTillDate));
    }

    public Map<String, Long> countStudentsByDepartment() {
        return students.stream()
                .collect(Collectors.groupingBy(
                        Student::getEngDepartment,
                        LinkedHashMap::new,
                        Collectors.counting()
                ));
    }

    public Map<String, Double> averagePercentageByDepartment() {
        return students.stream()
                .collect(Collectors.groupingBy(
                        Student::getEngDepartment,
                        LinkedHashMap::new,
                        Collectors.averagingDouble(Student::getPerTillDate)
                ));
    }

    public Optional<Student> getYoungestMaleInElectronicDepartment() {
        return students.stream()
                .filter(student -> "Male".equalsIgnoreCase(student.getGender()))
                .filter(student -> "Electronic".equals(student.getEngDepartment()))
                .min(Comparator.comparingInt(Student::getAge));
    }

    public Map<String, Long> countStudentsByGenderInComputerScience() {
        return students.stream()
                .filter(student -> "Computer Science".equals(student.getEngDepartment()))
                .collect(Collectors.groupingBy(
                        Student::getGender,
                        LinkedHashMap::new,
                        Collectors.counting()
                ));
    }
}
