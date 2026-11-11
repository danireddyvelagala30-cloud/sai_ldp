package com.assignment.order.client;

import com.assignment.order.dto.ProductRequestDto;
import com.assignment.order.dto.ProductResponse;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class ProductServiceClient implements ProductClient {

    private final RestClient restClient;

    public ProductServiceClient(@Value("${product.service.url:http://localhost:8081}") String productServiceUrl,
                                RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl(productServiceUrl).build();
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return restClient.get()
                .uri("/api/products")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(new ParameterizedTypeReference<List<ProductResponse>>() {});
    }

    @Override
    public ProductResponse getProductById(Long id) {
        ProductResponse product = restClient.get()
                .uri("/api/products/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(ProductResponse.class);
        if (product == null) {
            throw new EntityNotFoundException("Product " + id + " was not found");
        }
        return product;
    }

    @Override
    public ProductResponse createProduct(ProductRequestDto request) {
        return restClient.post()
                .uri("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(ProductResponse.class);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequestDto request) {
        return restClient.put()
                .uri("/api/products/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(ProductResponse.class);
    }

    @Override
    public void deleteProduct(Long id) {
        restClient.delete()
                .uri("/api/products/{id}", id)
                .retrieve()
                .toBodilessEntity();
    }
}
