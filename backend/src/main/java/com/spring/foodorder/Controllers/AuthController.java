package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.LoginForm;
import com.spring.foodorder.DTOs.RegistrationUserForm;
import com.spring.foodorder.Exceptions.InvalidCredentialsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Security.JwtAuthFilter;
import com.spring.foodorder.Services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<?> register(@RequestBody RegistrationUserForm registrationUserForm) {
        try {
            userService.register(registrationUserForm);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginForm loginForm, HttpServletResponse response) {
        try {
            String token = userService.login(loginForm);

            // Insert cookie
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60);
            response.addCookie(cookie);

            return ResponseEntity.ok("Login successfully");
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials: " + e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            String token = JwtAuthFilter.getTokenFromRequest(request);

            userService.logout(token);

            // Delete cookie
            Cookie deleteCookie = new Cookie("token", null);
            deleteCookie.setPath("/");
            deleteCookie.setMaxAge(0);
            deleteCookie.setHttpOnly(true);
            response.addCookie(deleteCookie);

            return ResponseEntity.ok("Logout successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Logout failed: " + e.getMessage());
        }
    }
}
