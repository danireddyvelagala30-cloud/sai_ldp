package com.assignment.product.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.assignment.product.dto.ProductRequest;
import com.assignment.product.model.Product;
import com.assignment.product.repository.ProductRepository;
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
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void findAllReturnsAllProducts() {
        Product p = new Product("Laptop", "Gaming laptop", BigDecimal.valueOf(1200.00));
        when(productRepository.findAll()).thenReturn(List.of(p));

        List<Product> result = productService.findAll();
        assertEquals(1, result.size());
        assertEquals("Laptop", result.get(0).getName());
    }

    @Test
    void findByIdWhenFoundReturnsProduct() {
        Product p = new Product("Laptop", "Gaming laptop", BigDecimal.valueOf(1200.00));
        ReflectionTestUtils.setField(p, "id", 1L);
        when(productRepository.findById(1L)).thenReturn(Optional.of(p));

        Product result = productService.findById(1L);
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Laptop", result.getName());
    }

    @Test
    void findByIdWhenNotFoundThrowsEntityNotFoundException() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> productService.findById(99L));
        assertEquals("Product 99 was not found", ex.getMessage());
    }

    @Test
    void createSavesAndReturnsProduct() {
        Product p = new Product("Monitor", "4K Monitor", BigDecimal.valueOf(350.00));
        when(productRepository.save(p)).thenReturn(p);

        Product result = productService.create(p);
        assertEquals("Monitor", result.getName());
        verify(productRepository).save(p);
    }

    @Test
    void updateModifiesExistingProduct() {
        Product existing = new Product("Old Name", "Old Desc", BigDecimal.valueOf(100.00));
        ReflectionTestUtils.setField(existing, "id", 1L);
        when(productRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product updatedInfo = new Product("New Name", "New Desc", BigDecimal.valueOf(150.00));
        Product result = productService.update(1L, updatedInfo);

        assertEquals("New Name", result.getName());
        assertEquals("New Desc", result.getDescription());
        assertEquals(BigDecimal.valueOf(150.00), result.getPrice());
        verify(productRepository).save(existing);
    }

    @Test
    void deleteRemovesProduct() {
        Product p = new Product("To Delete", "Desc", BigDecimal.valueOf(10.00));
        ReflectionTestUtils.setField(p, "id", 1L);
        when(productRepository.findById(1L)).thenReturn(Optional.of(p));

        productService.delete(1L);
        verify(productRepository).delete(p);
    }

    @Test
    void productModelAndDtoCoverage() throws Exception {
        Constructor<Product> ctor = Product.class.getDeclaredConstructor();
        ctor.setAccessible(true);
        Product empty = ctor.newInstance();
        assertNull(empty.getId());
        assertNull(empty.getName());
        assertNull(empty.getDescription());
        assertNull(empty.getPrice());

        empty.setName("Test");
        empty.setDescription("Test Desc");
        empty.setPrice(BigDecimal.TEN);
        assertEquals("Test", empty.getName());
        assertEquals("Test Desc", empty.getDescription());
        assertEquals(BigDecimal.TEN, empty.getPrice());

        ProductRequest req = new ProductRequest("ReqName", "ReqDesc", BigDecimal.ONE);
        assertEquals("ReqName", req.name());
        assertEquals("ReqDesc", req.description());
        assertEquals(BigDecimal.ONE, req.price());
    }
}
