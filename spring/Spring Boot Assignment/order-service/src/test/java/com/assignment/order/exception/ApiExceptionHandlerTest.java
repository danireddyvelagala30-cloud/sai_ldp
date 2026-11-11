package com.assignment.order.exception;

import static org.junit.jupiter.api.Assertions.assertEquals;

import jakarta.persistence.EntityNotFoundException;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;

class ApiExceptionHandlerTest {

    private final ApiExceptionHandler handler = new ApiExceptionHandler();

    @Test
    void handleNotFoundReturns404() {
        EntityNotFoundException ex = new EntityNotFoundException("Order not found");
        ResponseEntity<Map<String, String>> response = handler.handleNotFound(ex);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Order not found", response.getBody().get("error"));
    }

    @Test
    void handleClientNotFoundReturns404() {
        HttpClientErrorException.NotFound ex = (HttpClientErrorException.NotFound)
                HttpClientErrorException.create(HttpStatus.NOT_FOUND, "Not Found", HttpHeaders.EMPTY, new byte[0], null);
        ResponseEntity<Map<String, String>> response = handler.handleClientNotFound(ex);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(ex.getMessage(), response.getBody().get("error"));
    }
}
