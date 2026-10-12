package com.assignment.order.service;

import com.assignment.order.model.CustomerOrder;
import com.assignment.order.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<CustomerOrder> findAll() {
        return orderRepository.findAll();
    }

    public CustomerOrder findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order " + id + " was not found"));
    }

    public CustomerOrder create(CustomerOrder customerOrder) {
        return orderRepository.save(customerOrder);
    }

    public CustomerOrder update(Long id, CustomerOrder updatedOrder) {
        CustomerOrder customerOrder = findById(id);
        customerOrder.setProductId(updatedOrder.getProductId());
        customerOrder.setQuantity(updatedOrder.getQuantity());
        return orderRepository.save(customerOrder);
    }

    public void delete(Long id) {
        orderRepository.delete(findById(id));
    }
}
