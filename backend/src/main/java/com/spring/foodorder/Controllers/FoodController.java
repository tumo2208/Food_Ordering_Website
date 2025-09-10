package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.General.FoodItemDTO;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Documents.FoodItem;
import com.spring.foodorder.Services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @PostMapping("/addFoodItem")
    @PreAuthorize("hasAuthority('RESTAURANT_OWNER')")
    public ResponseEntity<?> addFoodItemToRestaurantMenu(@RequestBody FoodItemDTO foodItemDTO) {
        try {
            foodService.addFoodItemToRestaurantMenu(foodItemDTO);
            return ResponseEntity.ok("Food item added successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Restaurant not found: " + e.getMessage());
        } catch (ResourceAlreadyExistsException e) {
            return ResponseEntity.status(409).body("Food item name already exists: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/{foodItemId}")
    public ResponseEntity<?> getFoodItemById(@PathVariable String foodItemId) {
        try {
            FoodItem foodItem = foodService.getFoodItemById(foodItemId);
            return ResponseEntity.ok(Collections.singletonMap("foodItem", foodItem));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Food item not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/getByRestaurant&CuisineType")
    public ResponseEntity<?> getFoodItemsOfRestaurantByFoodType(
            @RequestParam(required = false) String restaurantId,
            @RequestParam(required = false) List<String> cuisineTypes) {
        try {
            return ResponseEntity.ok(Collections.singletonMap("foodItems",
                    foodService.getFoodItemsOfRestaurantByFoodType(restaurantId,
                            cuisineTypes.stream().map(FoodType::valueOf).toList())));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Restaurant or cuisine type not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
