package com.assignment.order.client;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withNoContent;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.assignment.order.dto.ProductRequestDto;
import com.assignment.order.dto.ProductResponse;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class ProductServiceClientTest {

    private ProductServiceClient client;
    private MockRestServiceServer server;

    @BeforeEach
    void setup() {
        RestClient.Builder builder = RestClient.builder();
        server = MockRestServiceServer.bindTo(builder).build();
        client = new ProductServiceClient("http://localhost:8081", builder);
    }

    @Test
    void getAllProductsReturnsList() {
        String json = """
                [{"id":1,"name":"Product A","description":"Desc A","price":10.50}]
                """;
        server.expect(requestTo("http://localhost:8081/api/products"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));

        List<ProductResponse> products = client.getAllProducts();
        assertEquals(1, products.size());
        assertEquals("Product A", products.get(0).name());
    }

    @Test
    void getProductByIdReturnsProduct() {
        String json = """
                {"id":1,"name":"Product A","description":"Desc A","price":10.50}
                """;
        server.expect(requestTo("http://localhost:8081/api/products/1"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));

        ProductResponse product = client.getProductById(1L);
        assertNotNull(product);
        assertEquals("Product A", product.name());
    }

    @Test
    void getProductByIdWhenBodyNullThrowsEntityNotFoundException() {
        server.expect(requestTo("http://localhost:8081/api/products/1"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess());

        assertThrows(EntityNotFoundException.class, () -> client.getProductById(1L));
    }

    @Test
    void createProductReturnsCreated() {
        String json = """
                {"id":1,"name":"New Product","description":"Desc","price":20.00}
                """;
        server.expect(requestTo("http://localhost:8081/api/products"))
                .andExpect(method(HttpMethod.POST))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));

        ProductResponse product = client.createProduct(new ProductRequestDto("New Product", "Desc", BigDecimal.valueOf(20.00)));
        assertEquals("New Product", product.name());
    }

    @Test
    void updateProductReturnsUpdated() {
        String json = """
                {"id":1,"name":"Updated Product","description":"Desc","price":25.00}
                """;
        server.expect(requestTo("http://localhost:8081/api/products/1"))
                .andExpect(method(HttpMethod.PUT))
                .andRespond(withSuccess(json, MediaType.APPLICATION_JSON));

        ProductResponse product = client.updateProduct(1L, new ProductRequestDto("Updated Product", "Desc", BigDecimal.valueOf(25.00)));
        assertEquals("Updated Product", product.name());
    }

    @Test
    void deleteProductSendsDeleteRequest() {
        server.expect(requestTo("http://localhost:8081/api/products/1"))
                .andExpect(method(HttpMethod.DELETE))
                .andRespond(withNoContent());

        client.deleteProduct(1L);
        server.verify();
    }
}
