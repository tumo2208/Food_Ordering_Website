package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.General.FoodItemDTO;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Documents.FoodItem;
import com.spring.foodorder.Documents.Restaurant;
import com.spring.foodorder.Documents.User;
import com.spring.foodorder.Objects.Rating;
import com.spring.foodorder.Objects.SizeToPrice;
import com.spring.foodorder.Repositories.FoodRepository;
import com.spring.foodorder.Repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @Autowired
    private CloudinaryService cloudinaryService;

    // Method to search food items by name or description
    public List<FoodItem> searchFoodItems(String query) {
        if (query == null || query.isEmpty()) {
            return foodRepository.findAll();
        }
        return foodRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    // Method to add a food item to restaurant menu
    public void addFoodItemToRestaurantMenu(FoodItemDTO foodItem) {
        User currentUser = userService.getCurrentUser();
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

        // Set price
        if (foodItem.getSizeToPrices().size() == 0) {
            throw new IllegalArgumentException("Food item must have at least one size and price.");
        }
        newFoodItem.setSizeToPrices(foodItem.getSizeToPrices());
        double minPrice = foodItem.getSizeToPrices()
                .stream().mapToDouble(SizeToPrice::getPrice).min().orElse(0.0);
        newFoodItem.setMinPrice(minPrice);

        // Save price of retaurant
        if (restaurant .getMinPrice() == 0) {
            restaurant.setMinPrice(minPrice);
        } else {
            restaurant.setMinPrice(Math.min(restaurant.getMinPrice(), minPrice));
        }
        restaurant.setMaxPrice(Math.max(restaurant.getMaxPrice(), minPrice));
        restaurant.setAvgPrice((restaurant.getMaxPrice() + restaurant.getMinPrice()) / 2);
        restaurantRepository.save(restaurant);

        newFoodItem.setDescription(foodItem.getDescription());
        newFoodItem.setCuisineTypes(foodItem.getCuisineTypes()
                .stream().map(FoodType::fromVietnameseName).collect(Collectors.toList()));
        newFoodItem.setRating(new Rating(0, 0)); // Initialize rating with zero count and total

        // Handle image upload if provided
        if (foodItem.getImage() != null
                && !foodItem.getImage().isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(foodItem.getImage(),
                    foodItem.getName());
            newFoodItem.setImgUrl(imageUrl);
        }

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
