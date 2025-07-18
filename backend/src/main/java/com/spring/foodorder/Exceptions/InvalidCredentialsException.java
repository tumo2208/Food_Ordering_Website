package com.spring.foodorder.Exceptions;

public class InvalidCredentialsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidCredentialsException(String message) {
        super(message);
    }

    public InvalidCredentialsException(String username, String password) {
        super(String.format("Invalid credentials for user: %s with password: %s", username, password));
    }
}