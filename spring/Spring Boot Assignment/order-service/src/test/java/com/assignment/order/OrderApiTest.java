package com.assignment.order;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.assignment.order.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class OrderApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OrderRepository orderRepository;

    @BeforeEach
    void clearOrders() {
        orderRepository.deleteAll();
    }

    @Test
    void supportsOrderCrudLifecycle() throws Exception {
        String createBody = """
                {"productId":42,"quantity":2}
                """;
        mockMvc.perform(post("/api/orders").contentType(MediaType.APPLICATION_JSON).content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.productId").value(42))
                .andExpect(jsonPath("$.quantity").value(2));

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productId").value(42));
        mockMvc.perform(get("/api/orders/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(2));

        String updateBody = """
                {"productId":51,"quantity":5}
                """;
        mockMvc.perform(put("/api/orders/1").contentType(MediaType.APPLICATION_JSON).content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(51))
                .andExpect(jsonPath("$.quantity").value(5));

        mockMvc.perform(delete("/api/orders/1")).andExpect(status().isNoContent());
        mockMvc.perform(get("/api/orders/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Order 1 was not found"));
        mockMvc.perform(delete("/api/orders/1")).andExpect(status().isNotFound());
        mockMvc.perform(put("/api/orders/1").contentType(MediaType.APPLICATION_JSON).content(updateBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidOrderRequests() throws Exception {
        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"productId\":0,\"quantity\":-1}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void startsApplicationFromCommandLine() {
        OrderServiceApplication.main(new String[]{
                "--spring.main.web-application-type=none",
                "--spring.datasource.url=jdbc:h2:mem:order-main-coverage",
                "--spring.main.banner-mode=off"});
    }
}
