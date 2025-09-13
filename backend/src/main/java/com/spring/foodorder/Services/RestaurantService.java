package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.RestaurantOwner.RegistrationRestaurantForm;
import com.spring.foodorder.Documents.PendingRestaurantRegisterRequest;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Documents.Restaurant;
import com.spring.foodorder.Documents.User;
import com.spring.foodorder.Repositories.PendingRestaurantRegisterRequestRepository;
import com.spring.foodorder.Repositories.RestaurantRepository;
import com.spring.foodorder.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService{
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private PendingRestaurantRegisterRequestRepository pendingRestaurantRegisterRequestRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private UserRepository userRepository;

    // Method to search restaurants by name or description
    public List<Restaurant> searchRestaurants(String query) {
        if (query == null || query.isEmpty()) {
            return restaurantRepository.findAll();
        }
        return restaurantRepository.findByRestaurantNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    // Method to request restaurant registration
    public String requestRestaurantRegistration(RegistrationRestaurantForm form) {
        User currentUser = userService.getCurrentUser();
        if (currentUser.getRestaurantId() != null) {
            throw new IllegalArgumentException("You are already registered as a restaurant owner.");
        }

        PendingRestaurantRegisterRequest request = new PendingRestaurantRegisterRequest();
        request.setOwnerId(currentUser.getId());
        request.setRestaurantName(form.getRestaurantName());
        request.setDescription(form.getDescription());
        request.setContactEmail(form.getContactEmail());
        request.setContactNumber(form.getContactNumber());
        request.setCuisineTypes(form.getCuisineTypes());
        request.setLocationAddress(form.getLocationAddress());
        request.setLocationDistrict(form.getLocationDistrict());
        request.setLocationCity(form.getLocationCity());
        request.setOperatingHours(form.getOperatingHours());

        // Handle image upload if provided
        if (form.getRestaurantImage() != null
                && !form.getRestaurantImage().isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(form.getRestaurantImage(),
                    form.getRestaurantName());
            request.setRestaurantImageUrl(imageUrl);
        }

        pendingRestaurantRegisterRequestRepository.save(request);

        currentUser.setRequestId(request.getId());
        userRepository.save(currentUser);

        return request.getId();
    }

    // Method to get restaurant by ID
    public Restaurant getRestaurantById(String restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with ID: " + restaurantId));
    }

    // Method to get all restaurants with optional filtering by cuisine type
    public List<Restaurant> getRestaurantsByCuisineType(List<FoodType> cuisineTypes) {
        if (cuisineTypes.size() == 0) {
            return restaurantRepository.findAll();
        } else {
            return restaurantRepository.findByCuisineTypesIn(cuisineTypes);
        }
    }
}
