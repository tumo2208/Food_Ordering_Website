package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.LoginForm;
import com.spring.foodorder.DTOs.LoginResponse;
import com.spring.foodorder.DTOs.RegistrationForm;
import com.spring.foodorder.Exceptions.InvalidCredentialsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationForm registrationForm) {
        try {
            userService.register(registrationForm);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginForm loginForm) {
        try {
            LoginResponse response = userService.login(loginForm);
            return ResponseEntity.ok(response);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        }
    }
}
