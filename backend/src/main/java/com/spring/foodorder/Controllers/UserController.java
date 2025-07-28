package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.UserDTO;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            return ResponseEntity.ok(userService.getUserProfile());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody UserDTO updatedUser) {
        try {
            userService.updateUserProfile(updatedUser);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
