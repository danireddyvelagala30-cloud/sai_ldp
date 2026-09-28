package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public String showStudents(Model model) {
        model.addAttribute("students", studentService.getAllStudents());
        return "students";
    }

    @GetMapping("/new")
    public String showAddStudentForm(Model model) {
        model.addAttribute("student", new Student());
        return "add-student";
    }

    @PostMapping
    public String addStudent(
            @Valid @ModelAttribute("student") Student student,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "add-student";
        }

        studentService.addStudent(student);
        return "redirect:/students";
    }
}
