package com.assignment.product.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.assignment.product.model.Product;
import com.assignment.product.repository.ProductRepository;
import java.math.BigDecimal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    void setup() {
        productRepository.deleteAll();
    }

    @Test
    void findAllReturnsProductList() throws Exception {
        productRepository.save(new Product("Keyboard", "USB keyboard", BigDecimal.valueOf(49.99)));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Keyboard"))
                .andExpect(jsonPath("$[0].price").value(49.99));
    }

    @Test
    void findByIdReturnsProduct() throws Exception {
        Product p = productRepository.save(new Product("Keyboard", "USB keyboard", BigDecimal.valueOf(49.99)));

        mockMvc.perform(get("/api/products/" + p.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(p.getId()))
                .andExpect(jsonPath("$.name").value("Keyboard"));
    }

    @Test
    void findByIdWhenNotFoundReturns404() throws Exception {
        mockMvc.perform(get("/api/products/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Product 999 was not found"));
    }

    @Test
    void createReturnsCreatedProduct() throws Exception {
        String body = """
                {"name":"Mouse","description":"Wireless mouse","price":29.99}
                """;
        mockMvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.name").value("Mouse"))
                .andExpect(jsonPath("$.price").value(29.99));
    }

    @Test
    void createWithInvalidPayloadReturnsBadRequest() throws Exception {
        String body = """
                {"name":"","description":"","price":-5}
                """;
        mockMvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateReturnsUpdatedProduct() throws Exception {
        Product p = productRepository.save(new Product("Mouse", "Old desc", BigDecimal.valueOf(19.99)));

        String body = """
                {"name":"Updated Mouse","description":"New desc","price":39.99}
                """;
        mockMvc.perform(put("/api/products/" + p.getId()).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Mouse"))
                .andExpect(jsonPath("$.price").value(39.99));
    }

    @Test
    void updateWhenNotFoundReturns404() throws Exception {
        String body = """
                {"name":"Updated Mouse","description":"New desc","price":39.99}
                """;
        mockMvc.perform(put("/api/products/999").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Product 999 was not found"));
    }

    @Test
    void deleteReturnsNoContent() throws Exception {
        Product p = productRepository.save(new Product("Mouse", "Old desc", BigDecimal.valueOf(19.99)));

        mockMvc.perform(delete("/api/products/" + p.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/products/" + p.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteWhenNotFoundReturns404() throws Exception {
        mockMvc.perform(delete("/api/products/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Product 999 was not found"));
    }
}
