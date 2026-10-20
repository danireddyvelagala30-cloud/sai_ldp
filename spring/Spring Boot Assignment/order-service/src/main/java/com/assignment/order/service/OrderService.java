package com.assignment.order.service;

import com.assignment.order.client.ProductClient;
import com.assignment.order.dto.ProductRequestDto;
import com.assignment.order.dto.ProductResponse;
import com.assignment.order.model.CustomerOrder;
import com.assignment.order.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;

    public OrderService(OrderRepository orderRepository, ProductClient productClient) {
        this.orderRepository = orderRepository;
        this.productClient = productClient;
    }

    public List<CustomerOrder> findAll() {
        return orderRepository.findAll();
    }

    public CustomerOrder findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order " + id + " was not found"));
    }

    public CustomerOrder create(CustomerOrder customerOrder) {
        productClient.getProductById(customerOrder.getProductId());
        return orderRepository.save(customerOrder);
    }

    public CustomerOrder update(Long id, CustomerOrder updatedOrder) {
        CustomerOrder customerOrder = findById(id);
        productClient.getProductById(updatedOrder.getProductId());
        customerOrder.setProductId(updatedOrder.getProductId());
        customerOrder.setQuantity(updatedOrder.getQuantity());
        return orderRepository.save(customerOrder);
    }

    public void delete(Long id) {
        orderRepository.delete(findById(id));
    }

    public ProductResponse getProductForOrder(Long orderId) {
        CustomerOrder order = findById(orderId);
        return productClient.getProductById(order.getProductId());
    }

    public List<ProductResponse> getAllProductsFromProductService() {
        return productClient.getAllProducts();
    }

    public ProductResponse getProductFromProductService(Long productId) {
        return productClient.getProductById(productId);
    }

    public ProductResponse createProductInProductService(ProductRequestDto request) {
        return productClient.createProduct(request);
    }

    public ProductResponse updateProductInProductService(Long productId, ProductRequestDto request) {
        return productClient.updateProduct(productId, request);
    }

    public void deleteProductInProductService(Long productId) {
        productClient.deleteProduct(productId);
    }
}
