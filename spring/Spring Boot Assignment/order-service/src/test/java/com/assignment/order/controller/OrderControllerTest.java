package com.assignment.order.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.assignment.order.client.ProductClient;
import com.assignment.order.dto.ProductRequestDto;
import com.assignment.order.dto.ProductResponse;
import com.assignment.order.model.CustomerOrder;
import com.assignment.order.repository.OrderRepository;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OrderRepository orderRepository;

    @MockBean
    private ProductClient productClient;

    @BeforeEach
    void setup() {
        orderRepository.deleteAll();
    }

    @Test
    void findAllReturnsOrderList() throws Exception {
        orderRepository.save(new CustomerOrder(101L, 3));

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productId").value(101))
                .andExpect(jsonPath("$[0].quantity").value(3));
    }

    @Test
    void findByIdReturnsOrder() throws Exception {
        CustomerOrder order = orderRepository.save(new CustomerOrder(102L, 5));

        mockMvc.perform(get("/api/orders/" + order.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(order.getId()))
                .andExpect(jsonPath("$.productId").value(102))
                .andExpect(jsonPath("$.quantity").value(5));
    }

    @Test
    void findByIdWhenNotFoundReturns404() throws Exception {
        mockMvc.perform(get("/api/orders/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Order 999 was not found"));
    }

    @Test
    void createReturnsCreatedOrder() throws Exception {
        ProductResponse mockProduct = new ProductResponse(42L, "Keyboard", "USB", BigDecimal.valueOf(49.99));
        when(productClient.getProductById(42L)).thenReturn(mockProduct);

        String body = """
                {"productId":42,"quantity":2}
                """;
        mockMvc.perform(post("/api/orders").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.productId").value(42))
                .andExpect(jsonPath("$.quantity").value(2));
    }

    @Test
    void createWithInvalidPayloadReturnsBadRequest() throws Exception {
        String body = """
                {"productId":0,"quantity":-1}
                """;
        mockMvc.perform(post("/api/orders").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateReturnsUpdatedOrder() throws Exception {
        CustomerOrder order = orderRepository.save(new CustomerOrder(10L, 2));
        ProductResponse mockProduct = new ProductResponse(20L, "Mouse", "Wireless", BigDecimal.valueOf(25.00));
        when(productClient.getProductById(20L)).thenReturn(mockProduct);

        String body = """
                {"productId":20,"quantity":7}
                """;
        mockMvc.perform(put("/api/orders/" + order.getId()).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(20))
                .andExpect(jsonPath("$.quantity").value(7));
    }

    @Test
    void updateWhenNotFoundReturns404() throws Exception {
        ProductResponse mockProduct = new ProductResponse(20L, "Mouse", "Wireless", BigDecimal.valueOf(25.00));
        when(productClient.getProductById(20L)).thenReturn(mockProduct);

        String body = """
                {"productId":20,"quantity":7}
                """;
        mockMvc.perform(put("/api/orders/999").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Order 999 was not found"));
    }

    @Test
    void deleteReturnsNoContent() throws Exception {
        CustomerOrder order = orderRepository.save(new CustomerOrder(10L, 2));

        mockMvc.perform(delete("/api/orders/" + order.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/orders/" + order.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteWhenNotFoundReturns404() throws Exception {
        mockMvc.perform(delete("/api/orders/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Order 999 was not found"));
    }

    @Test
    void getProductForOrderReturnsProduct() throws Exception {
        CustomerOrder order = orderRepository.save(new CustomerOrder(42L, 1));
        ProductResponse mockProduct = new ProductResponse(42L, "Keyboard", "USB", BigDecimal.valueOf(49.99));
        when(productClient.getProductById(42L)).thenReturn(mockProduct);

        mockMvc.perform(get("/api/orders/" + order.getId() + "/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(42))
                .andExpect(jsonPath("$.name").value("Keyboard"))
                .andExpect(jsonPath("$.price").value(49.99));
    }

    @Test
    void getAllProductsCallsProductService() throws Exception {
        ProductResponse p1 = new ProductResponse(1L, "Laptop", "Tech", BigDecimal.valueOf(999.99));
        when(productClient.getAllProducts()).thenReturn(List.of(p1));

        mockMvc.perform(get("/api/orders/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Laptop"));
    }

    @Test
    void getProductByIdCallsProductService() throws Exception {
        ProductResponse p1 = new ProductResponse(1L, "Laptop", "Tech", BigDecimal.valueOf(999.99));
        when(productClient.getProductById(1L)).thenReturn(p1);

        mockMvc.perform(get("/api/orders/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Laptop"));
    }

    @Test
    void createProductCallsProductService() throws Exception {
        ProductResponse p1 = new ProductResponse(5L, "Headphones", "Audio", BigDecimal.valueOf(79.99));
        when(productClient.createProduct(any(ProductRequestDto.class))).thenReturn(p1);

        String body = """
                {"name":"Headphones","description":"Audio","price":79.99}
                """;
        mockMvc.perform(post("/api/orders/products").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.name").value("Headphones"));
    }

    @Test
    void updateProductCallsProductService() throws Exception {
        ProductResponse p1 = new ProductResponse(5L, "Updated Headphones", "Audio", BigDecimal.valueOf(89.99));
        when(productClient.updateProduct(eq(5L), any(ProductRequestDto.class))).thenReturn(p1);

        String body = """
                {"name":"Updated Headphones","description":"Audio","price":89.99}
                """;
        mockMvc.perform(put("/api/orders/products/5").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Headphones"));
    }

    @Test
    void deleteProductCallsProductService() throws Exception {
        doNothing().when(productClient).deleteProduct(5L);

        mockMvc.perform(delete("/api/orders/products/5"))
                .andExpect(status().isNoContent());
    }
}
