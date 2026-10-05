package com.example.springbootjunit.product;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    @Test
    void findAll_returnsProducts() throws Exception {
        when(productService.findAll()).thenReturn(List.of(
                new ProductResponse(1L, "Notebook", new BigDecimal("3.50"), 12)));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Notebook"))
                .andExpect(jsonPath("$[0].stock").value(12));
    }

    @Test
    void findById_returnsProduct() throws Exception {
        when(productService.findById(1L))
                .thenReturn(new ProductResponse(1L, "Notebook", new BigDecimal("3.50"), 12));

        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Notebook"))
                .andExpect(jsonPath("$.price").value(3.50));
    }

    @Test
    void create_returnsCreatedProductAndLocation() throws Exception {
        ProductResponse response = new ProductResponse(1L, "Notebook", new BigDecimal("3.50"), 12);
        when(productService.create(any(CreateProductRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Notebook","price":3.50,"stock":12}
                                """))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/products/1"))
                .andExpect(jsonPath("$.name").value("Notebook"))
                .andExpect(jsonPath("$.stock").value(12));
    }

    @Test
    void create_rejectsInvalidRequestWithoutCallingService() throws Exception {
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":" ","price":0,"stock":-1}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").isNotEmpty());

        verify(productService, never()).create(any(CreateProductRequest.class));
    }

    @Test
    void findById_returnsNotFoundWhenMissing() throws Exception {
        when(productService.findById(99L)).thenThrow(new ProductNotFoundException(99L));

        mockMvc.perform(get("/api/products/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Product with id 99 was not found"));
    }

    @Test
    void update_returnsUpdatedProduct() throws Exception {
        ProductResponse response = new ProductResponse(1L, "Journal", new BigDecimal("5.00"), 8);
        when(productService.update(eq(1L), any(UpdateProductRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Journal","price":5.00,"stock":8}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Journal"));
    }

    @Test
    void delete_returnsNoContent() throws Exception {
        doNothing().when(productService).delete(1L);

        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isNoContent());

        verify(productService).delete(1L);
    }
}
