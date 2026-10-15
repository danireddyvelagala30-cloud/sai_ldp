package com.assignment.product;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.assignment.product.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ProductApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    void clearProducts() {
        productRepository.deleteAll();
    }

    @Test
    void supportsProductCrudLifecycle() throws Exception {
        String createBody = """
                {"name":"Keyboard","description":"USB keyboard","price":49.99}
                """;
        mockMvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name").value("Keyboard"))
                .andExpect(jsonPath("$.description").value("USB keyboard"))
                .andExpect(jsonPath("$.price").value(49.99));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Keyboard"));
        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Keyboard"));

        String updateBody = """
                {"name":"Mechanical Keyboard","description":"Wireless keyboard","price":79.99}
                """;
        mockMvc.perform(put("/api/products/1").contentType(MediaType.APPLICATION_JSON).content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Mechanical Keyboard"))
                .andExpect(jsonPath("$.description").value("Wireless keyboard"))
                .andExpect(jsonPath("$.price").value(79.99));

        mockMvc.perform(delete("/api/products/1")).andExpect(status().isNoContent());
        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Product 1 was not found"));
        mockMvc.perform(delete("/api/products/1")).andExpect(status().isNotFound());
        mockMvc.perform(put("/api/products/1").contentType(MediaType.APPLICATION_JSON).content(updateBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidProductRequests() throws Exception {
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\" \",\"price\":-1}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void startsApplicationFromCommandLine() {
        ProductServiceApplication.main(new String[]{
                "--spring.main.web-application-type=none",
                "--spring.datasource.url=jdbc:h2:mem:product-main-coverage",
                "--spring.main.banner-mode=off"});
    }
}
