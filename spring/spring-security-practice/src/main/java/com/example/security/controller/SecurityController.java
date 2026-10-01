package com.example.security.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {

    @GetMapping("/")
    public String home() {
        return "Spring Security practice app. Try /public/info, /user/profile, or /admin/dashboard.";
    }

    @GetMapping("/public/info")
    public String publicInfo() {
        return "This endpoint is public.";
    }

    @GetMapping("/access-denied")
    public String accessDenied() {
        return "Access denied. This page requires a different role. "
                + "Use teacher / admin-pass to access the admin dashboard.";
    }

    @GetMapping("/user/profile")
    public String userProfile(Authentication authentication) {
        return "Welcome, " + authentication.getName() + ". You have the USER role.";
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "Welcome to the admin dashboard.";
    }
}
