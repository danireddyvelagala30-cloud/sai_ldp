package com.assignment.product;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProductServiceApplicationTest {

    @Test
    void contextLoads() {
    }

    @Test
    void startsApplicationFromCommandLine() {
        ProductServiceApplication.main(new String[]{
                "--spring.main.web-application-type=none",
                "--spring.datasource.url=jdbc:h2:mem:product-app-test",
                "--spring.main.banner-mode=off"});
    }
}
