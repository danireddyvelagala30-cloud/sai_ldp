package com.example;

import com.example.service.UserService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@ComponentScan("com.example")
@EnableAspectJAutoProxy
public class App {
    public static void main(String[] args) {
        try (var context = new AnnotationConfigApplicationContext(App.class)) {
            UserService userService = context.getBean(UserService.class);

            userService.createUser("Alice");
            userService.updateUser("Alice");
            userService.deleteUser("Alice");

            try {
                userService.updateUser("");
            } catch (IllegalArgumentException exception) {
                System.out.println("App handled invalid update: " + exception.getMessage());
            }
        }
    }
}
