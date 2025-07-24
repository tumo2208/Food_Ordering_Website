package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.RegistrationRestaurantForm;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Enums.UserRole;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Objects.Address;
import com.spring.foodorder.Documents.Restaurant;
import com.spring.foodorder.Documents.User;
import com.spring.foodorder.Objects.Rating;
import com.spring.foodorder.Repositories.RestaurantRepository;
import com.spring.foodorder.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantService{
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // Method to register a restaurant
    public void registerRestaurant(RegistrationRestaurantForm registrationRestaurantForm) {
        User currentUser = userService.getUserProfile();
        if (currentUser == null ) {
            throw new IllegalArgumentException("You must be logged in as a restaurant owner to register a restaurant.");
        } else if (currentUser.getRestaurantId() != null) {
            throw new IllegalArgumentException("You are already registered as a restaurant owner.");
        }

        // Create a new restaurant entity
        Optional<Restaurant> restaurant = restaurantRepository
                .findByContactEmail(registrationRestaurantForm.getContactEmail());
        if (restaurant.isPresent()) {
            throw new ResourceAlreadyExistsException("Restaurant with this email already exists.");
        }
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setOwnerId(currentUser.getId());
        newRestaurant.setRestaurantName(registrationRestaurantForm.getRestaurantName());
        newRestaurant.setContactNumber(registrationRestaurantForm.getContactNumber());
        newRestaurant.setContactEmail(registrationRestaurantForm.getContactEmail());
        newRestaurant.setDescription(registrationRestaurantForm.getDescription());
        newRestaurant.setOperatingHours(registrationRestaurantForm.getOperatingHours());
        newRestaurant.setCuisineTypes(registrationRestaurantForm.getCuisineTypes()
                .stream().map(FoodType::fromVietnameseName).collect(Collectors.toList()));
        newRestaurant.setLocation(new Address(registrationRestaurantForm.getLocationAddress(),
                registrationRestaurantForm.getLocationDistrict(),
                registrationRestaurantForm.getLocationCity()));
        newRestaurant.setRating(new Rating(0, 0)); // Initialize rating with zero count and total

        newRestaurant.setMaxPrice(0);
        newRestaurant.setMinPrice(0);
        newRestaurant.setAvgPrice(0);

        // Handle image upload if provided
        if (registrationRestaurantForm.getRestaurantImage() != null
                && !registrationRestaurantForm.getRestaurantImage().isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(registrationRestaurantForm.getRestaurantImage(),
                    registrationRestaurantForm.getRestaurantName());
            newRestaurant.setImgUrl(imageUrl);
        }
        restaurantRepository.save(newRestaurant);

        // Update the user's role to RESTAURANT_OWNER
        currentUser.setRole(UserRole.RESTAURANT_OWNER);
        currentUser.setRestaurantId(newRestaurant.getId());
        userRepository.save(currentUser);
    }


    // Method to get restaurant by ID
    public Restaurant getRestaurantById(String restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with ID: " + restaurantId));
    }

    // Method to get all restaurants with optional filtering by cuisine type
    public List<Restaurant> getRestaurantsByCuisineType(List<FoodType> cuisineTypes) {
        return restaurantRepository.findByCuisineTypesIn(cuisineTypes);
    }
}
