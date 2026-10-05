package com.example.springbootjunit.product;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void findAll_mapsProductsToResponses() {
        Product product = product("Notebook", "3.50", 12);
        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductResponse> result = productService.findAll();

        assertEquals(1, result.size());
        assertEquals("Notebook", result.get(0).name());
        assertEquals(new BigDecimal("3.50"), result.get(0).price());
        verify(productRepository).findAll();
    }

    @Test
    void findById_returnsProductWhenItExists() {
        Product product = product("Notebook", "3.50", 12);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductResponse result = productService.findById(1L);

        assertEquals("Notebook", result.name());
        assertEquals(12, result.stock());
    }

    @Test
    void findById_throwsWhenProductDoesNotExist() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productService.findById(99L));

        verify(productRepository, never()).save(any());
    }

    @Test
    void create_savesAndReturnsProduct() {
        CreateProductRequest request = new CreateProductRequest("Notebook", new BigDecimal("3.50"), 12);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
            Product saved = invocation.getArgument(0);
            return saved;
        });

        ProductResponse result = productService.create(request);

        assertEquals("Notebook", result.name());
        assertEquals(new BigDecimal("3.50"), result.price());
        assertEquals(12, result.stock());
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void update_changesAnExistingProduct() {
        Product product = product("Notebook", "3.50", 12);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(product)).thenReturn(product);

        ProductResponse result = productService.update(
                1L, new UpdateProductRequest("Journal", new BigDecimal("5.00"), 8));

        assertEquals("Journal", result.name());
        assertEquals(new BigDecimal("5.00"), result.price());
        assertEquals(8, result.stock());
        verify(productRepository).save(product);
    }

    @Test
    void delete_deletesAnExistingProduct() {
        Product product = product("Notebook", "3.50", 12);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        productService.delete(1L);

        verify(productRepository).delete(product);
    }

    @Test
    void delete_throwsWhenProductDoesNotExist() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productService.delete(99L));

        verify(productRepository, never()).delete(any(Product.class));
    }

    private static Product product(String name, String price, int stock) {
        return new Product(name, new BigDecimal(price), stock);
    }
}
