package com.assignment.order.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.assignment.order.client.ProductClient;
import com.assignment.order.dto.OrderRequest;
import com.assignment.order.dto.ProductRequestDto;
import com.assignment.order.dto.ProductResponse;
import com.assignment.order.model.CustomerOrder;
import com.assignment.order.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import java.lang.reflect.Constructor;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductClient productClient;

    @InjectMocks
    private OrderService orderService;

    @Test
    void findAllReturnsOrders() {
        CustomerOrder order = new CustomerOrder(1L, 2);
        when(orderRepository.findAll()).thenReturn(List.of(order));

        List<CustomerOrder> result = orderService.findAll();
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getProductId());
    }

    @Test
    void findByIdWhenFoundReturnsOrder() {
        CustomerOrder order = new CustomerOrder(1L, 2);
        ReflectionTestUtils.setField(order, "id", 10L);
        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));

        CustomerOrder result = orderService.findById(10L);
        assertNotNull(result);
        assertEquals(10L, result.getId());
        assertEquals(2, result.getQuantity());
    }

    @Test
    void findByIdWhenNotFoundThrowsEntityNotFoundException() {
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> orderService.findById(99L));
        assertEquals("Order 99 was not found", ex.getMessage());
    }

    @Test
    void createVerifiesProductAndSavesOrder() {
        CustomerOrder order = new CustomerOrder(42L, 3);
        ProductResponse product = new ProductResponse(42L, "Widget", "Desc", BigDecimal.TEN);
        when(productClient.getProductById(42L)).thenReturn(product);
        when(orderRepository.save(order)).thenReturn(order);

        CustomerOrder result = orderService.create(order);
        assertEquals(42L, result.getProductId());
        verify(productClient).getProductById(42L);
        verify(orderRepository).save(order);
    }

    @Test
    void updateVerifiesProductAndUpdatesOrder() {
        CustomerOrder existing = new CustomerOrder(1L, 2);
        ReflectionTestUtils.setField(existing, "id", 10L);
        when(orderRepository.findById(10L)).thenReturn(Optional.of(existing));
        when(orderRepository.save(any(CustomerOrder.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ProductResponse product = new ProductResponse(2L, "New Widget", "Desc", BigDecimal.TEN);
        when(productClient.getProductById(2L)).thenReturn(product);

        CustomerOrder updatedInfo = new CustomerOrder(2L, 5);
        CustomerOrder result = orderService.update(10L, updatedInfo);

        assertEquals(2L, result.getProductId());
        assertEquals(5, result.getQuantity());
        verify(productClient).getProductById(2L);
        verify(orderRepository).save(existing);
    }

    @Test
    void deleteRemovesOrder() {
        CustomerOrder order = new CustomerOrder(1L, 2);
        ReflectionTestUtils.setField(order, "id", 10L);
        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));

        orderService.delete(10L);
        verify(orderRepository).delete(order);
    }

    @Test
    void getProductForOrderFetchesProductDetails() {
        CustomerOrder order = new CustomerOrder(42L, 2);
        ReflectionTestUtils.setField(order, "id", 10L);
        when(orderRepository.findById(10L)).thenReturn(Optional.of(order));

        ProductResponse product = new ProductResponse(42L, "Widget", "Desc", BigDecimal.TEN);
        when(productClient.getProductById(42L)).thenReturn(product);

        ProductResponse result = orderService.getProductForOrder(10L);
        assertEquals(42L, result.id());
        assertEquals("Widget", result.name());
    }

    @Test
    void interServiceDelegationMethods() {
        ProductResponse p = new ProductResponse(1L, "Widget", "Desc", BigDecimal.TEN);
        ProductRequestDto req = new ProductRequestDto("New Widget", "Desc", BigDecimal.TEN);

        when(productClient.getAllProducts()).thenReturn(List.of(p));
        when(productClient.getProductById(1L)).thenReturn(p);
        when(productClient.createProduct(req)).thenReturn(p);
        when(productClient.updateProduct(1L, req)).thenReturn(p);

        assertEquals(1, orderService.getAllProductsFromProductService().size());
        assertEquals("Widget", orderService.getProductFromProductService(1L).name());
        assertEquals("Widget", orderService.createProductInProductService(req).name());
        assertEquals("Widget", orderService.updateProductInProductService(1L, req).name());

        orderService.deleteProductInProductService(1L);
        verify(productClient).deleteProduct(1L);
    }

    @Test
    void modelAndDtoCoverage() throws Exception {
        Constructor<CustomerOrder> ctor = CustomerOrder.class.getDeclaredConstructor();
        ctor.setAccessible(true);
        CustomerOrder empty = ctor.newInstance();
        assertNull(empty.getId());
        assertNull(empty.getProductId());
        assertEquals(0, empty.getQuantity());

        empty.setProductId(99L);
        empty.setQuantity(10);
        assertEquals(99L, empty.getProductId());
        assertEquals(10, empty.getQuantity());

        OrderRequest orderReq = new OrderRequest(10L, 5);
        assertEquals(10L, orderReq.productId());
        assertEquals(5, orderReq.quantity());

        ProductResponse prodResp = new ProductResponse(1L, "Name", "Desc", BigDecimal.TEN);
        assertEquals(1L, prodResp.id());
        assertEquals("Name", prodResp.name());
        assertEquals("Desc", prodResp.description());
        assertEquals(BigDecimal.TEN, prodResp.price());

        ProductRequestDto prodReq = new ProductRequestDto("PName", "PDesc", BigDecimal.ONE);
        assertEquals("PName", prodReq.name());
        assertEquals("PDesc", prodReq.description());
        assertEquals(BigDecimal.ONE, prodReq.price());
    }
}
