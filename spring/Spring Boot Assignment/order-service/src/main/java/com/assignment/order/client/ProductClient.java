package com.assignment.order.client;

import com.assignment.order.dto.ProductRequestDto;
import com.assignment.order.dto.ProductResponse;
import java.util.List;

public interface ProductClient {

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse createProduct(ProductRequestDto request);

    ProductResponse updateProduct(Long id, ProductRequestDto request);

    void deleteProduct(Long id);
}
