package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.RegistrationRestaurantForm;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Models.Restaurant;
import com.spring.foodorder.Services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/register")
    public ResponseEntity<?> registerRestaurant(@RequestBody RegistrationRestaurantForm registrationRestaurantForm) {
        try {
            restaurantService.registerRestaurant(registrationRestaurantForm);
            return ResponseEntity.ok("Restaurant registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        } catch (ResourceAlreadyExistsException e) {
            return ResponseEntity.status(409).body("Registration failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<?> getRestaurantById(@PathVariable String restaurantId) {
        try {
            Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
            return ResponseEntity.ok(Collections.singletonMap("restaurant", restaurant));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Restaurant not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getByCuisineType")
    public ResponseEntity<?> getRestaurantsByCuisineType(@RequestParam(required = false) List<String> cuisineType) {
        try {
            List<Restaurant> restaurants = restaurantService.getRestaurantsByCuisineType(
                    cuisineType.stream().map(FoodType::valueOf).toList());
            return ResponseEntity.ok(Collections.singletonMap("restaurants", restaurants));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("No restaurants found for this cuisine type: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
