package com.assignment.order;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class OrderServiceApplicationTest {

    @Test
    void contextLoads() {
    }

    @Test
    void startsApplicationFromCommandLine() {
        OrderServiceApplication.main(new String[]{
                "--spring.main.web-application-type=none",
                "--spring.datasource.url=jdbc:h2:mem:order-app-test",
                "--spring.main.banner-mode=off"});
    }
}
