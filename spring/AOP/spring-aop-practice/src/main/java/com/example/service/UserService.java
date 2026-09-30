package com.example.service;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    public String createUser(String name) {
        requireName(name);
        System.out.println("Creating user: " + name);
        return "User created: " + name;
    }

    public String updateUser(String name) {
        requireName(name);
        System.out.println("Updating user: " + name);
        return "User updated: " + name;
    }

    public String deleteUser(String name) {
        requireName(name);
        System.out.println("Deleting user: " + name);
        return "User deleted: " + name;
    }

    private void requireName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("User name must not be blank");
        }
    }
}
