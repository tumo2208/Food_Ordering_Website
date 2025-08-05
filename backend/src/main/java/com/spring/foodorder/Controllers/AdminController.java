package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.ApproveRequest;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<?> getAllRestaurantRegistrationRequests() {
        try {
            return ResponseEntity.ok(adminService.getAllPendingRestaurantRegistrationRequests());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/approveRequest")
    public ResponseEntity<?> approveRestaurantRegistrationRequest(@RequestBody ApproveRequest request) {
        try {
            adminService.approvalRestaurantRegistrationRequest(request.getRequestId(), request.getStatus());
            return ResponseEntity.ok("Restaurant registration request processed successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Request or user not found: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Request for restaurant registration failed: User is already registered as a restaurant owner.");
        } catch (ResourceAlreadyExistsException e) {
            return ResponseEntity.badRequest().body("Request for restaurant registration failed: Restaurant with the same email already exists.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
