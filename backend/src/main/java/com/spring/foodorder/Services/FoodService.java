package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.FoodItemDTO;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Models.FoodItem;
import com.spring.foodorder.Models.Restaurant;
import com.spring.foodorder.Models.User;
import com.spring.foodorder.Repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    // Method to add a food item to restaurant menu
    public void addFoodItemToRestaurantMenu(FoodItemDTO foodItem) {
        User currentUser = userService.getUserProfile();
        if (currentUser == null || currentUser.getRestaurantId() == null) {
            throw new ResourceNotFoundException("You must be logged in as a restaurant owner to add food items.");
        }
        Restaurant restaurant = restaurantService.getRestaurantById(currentUser.getRestaurantId());
        if (foodRepository.findByNameAndRestaurantId(foodItem.getName(), currentUser.getRestaurantId()).isPresent()) {
            throw new ResourceAlreadyExistsException("Food item with this name already exists in the restaurant.");
        }
        FoodItem newFoodItem = new FoodItem();
        newFoodItem.setRestaurantId(restaurant.getId());
        newFoodItem.setName(foodItem.getName());
        newFoodItem.setPrice(foodItem.getPrice());
        newFoodItem.setDescription(foodItem.getDescription());
        newFoodItem.setCuisineTypes(foodItem.getCuisineTypes()
                .stream().map(FoodType::fromVietnameseName).collect(Collectors.toList()));
        foodRepository.save(newFoodItem);
    }

    // Method to get a food item by its ID
    public FoodItem getFoodItemById(String foodItemId) {
        return foodRepository.findById(foodItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with ID: " + foodItemId));
    }

    // Method to get all food items of a restaurant by cuisine type
    public List<FoodItem> getFoodItemsOfRestaurantByFoodType(String restaurantId, List<FoodType> cuisineType) {
        if (restaurantId == null) {
            return foodRepository.findByCuisineTypesIn(cuisineType);
        } else if (cuisineType == null || cuisineType.isEmpty()) {
            return foodRepository.findByRestaurantId(restaurantId);
        } else {
            return foodRepository.findByRestaurantIdAndCuisineTypesIn(restaurantId, cuisineType);
        }
    }
}
