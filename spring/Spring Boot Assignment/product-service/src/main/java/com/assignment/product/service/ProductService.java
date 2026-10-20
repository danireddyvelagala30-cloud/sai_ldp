package com.assignment.product.service;

import com.assignment.product.model.Product;
import com.assignment.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product " + id + " was not found"));
    }

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public Product update(Long id, Product updatedProduct) {
        Product product = findById(id);
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.delete(findById(id));
    }
}
