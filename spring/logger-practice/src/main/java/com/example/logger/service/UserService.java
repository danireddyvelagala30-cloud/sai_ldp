package com.example.logger.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    public String findUserById(long id) {
        log.debug("Searching database for user with id={}", id);

        if (id <= 0) {
            log.warn("Invalid user id received: {}", id);
            throw new IllegalArgumentException("User id must be greater than zero");
        }

        if (id == 404) {
            log.error("User was not found for id={}", id);
            throw new UserNotFoundException("User not found: " + id);
        }

        log.debug("User found successfully for id={}", id);
        return "User{id=" + id + ", name='Alex'}";
    }

    public static class UserNotFoundException extends RuntimeException {

        public UserNotFoundException(String message) {
            super(message);
        }
    }
}
