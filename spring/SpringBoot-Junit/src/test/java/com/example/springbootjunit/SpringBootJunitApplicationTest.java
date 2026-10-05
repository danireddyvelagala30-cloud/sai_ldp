package com.example.springbootjunit;

import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.boot.SpringApplication;

import static org.mockito.Mockito.mockStatic;

class SpringBootJunitApplicationTest {

    @Test
    void main_delegatesToSpringApplication() {
        String[] args = {"--spring.main.web-application-type=none"};

        try (MockedStatic<SpringApplication> springApplication = mockStatic(SpringApplication.class)) {
            SpringBootJunitApplication.main(args);

            springApplication.verify(() -> SpringApplication.run(SpringBootJunitApplication.class, args));
        }
    }
}
