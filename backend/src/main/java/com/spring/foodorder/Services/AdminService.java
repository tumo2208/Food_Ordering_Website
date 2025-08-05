package com.spring.foodorder.Services;

import com.spring.foodorder.Documents.PendingRestaurantRegisterRequest;
import com.spring.foodorder.Documents.Restaurant;
import com.spring.foodorder.Documents.User;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Enums.UserRole;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Objects.Address;
import com.spring.foodorder.Objects.Rating;
import com.spring.foodorder.Repositories.PendingRestaurantRegisterRequestRepository;
import com.spring.foodorder.Repositories.RestaurantRepository;
import com.spring.foodorder.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private PendingRestaurantRegisterRequestRepository pendingRestaurantRegisterRequestRepository;

    @Autowired
    private UserRepository userRepository;

    // Method to get all pending restaurant registration requests
    public List<PendingRestaurantRegisterRequest> getAllPendingRestaurantRegistrationRequests() {
        List<PendingRestaurantRegisterRequest> requests = pendingRestaurantRegisterRequestRepository.findAll();
        requests.sort(Comparator.comparing(PendingRestaurantRegisterRequest::getCreatedAt));
        return requests;
    }

    // Method to approve a restaurant registration request
    public void approvalRestaurantRegistrationRequest(String requestId, String status) {
        PendingRestaurantRegisterRequest request = pendingRestaurantRegisterRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Pending restaurant registration request not found with ID: " + requestId));

        if (status.equals("APPROVED")) {
            acceptRestaurantRegistration(request);
        }

        pendingRestaurantRegisterRequestRepository.delete(request);

        User user = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getOwnerId()));
        user.setRequestId(null);
        userRepository.save(user);
    }

    // Method to register a restaurant
    public void acceptRestaurantRegistration(PendingRestaurantRegisterRequest request) {
        User user = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getRestaurantId() != null) {
            throw new IllegalArgumentException("User is already registered as a restaurant owner.");
        }

        // Create a new restaurant entity
        Optional<Restaurant> restaurant = restaurantRepository
                .findByContactEmail(request.getContactEmail());
        if (restaurant.isPresent()) {
            throw new ResourceAlreadyExistsException("Restaurant with this email already exists.");
        }
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setOwnerId(user.getId());
        newRestaurant.setRestaurantName(request.getRestaurantName());
        newRestaurant.setContactNumber(request.getContactNumber());
        newRestaurant.setContactEmail(request.getContactEmail());
        newRestaurant.setDescription(request.getDescription());
        newRestaurant.setOperatingHours(request.getOperatingHours());
        newRestaurant.setCuisineTypes(request.getCuisineTypes()
                .stream().map(FoodType::fromVietnameseName).collect(Collectors.toList()));
        newRestaurant.setLocation(new Address(request.getLocationAddress(),
                request.getLocationDistrict(),
                request.getLocationCity()));
        newRestaurant.setRating(new Rating(0, 0)); // Initialize rating with zero count and total

        newRestaurant.setImgUrl(request.getRestaurantImageUrl());

        newRestaurant.setMaxPrice(0);
        newRestaurant.setMinPrice(0);
        newRestaurant.setAvgPrice(0);

        restaurantRepository.save(newRestaurant);

        // Update the user's role to RESTAURANT_OWNER
        user.setRole(UserRole.RESTAURANT_OWNER);
        user.setRestaurantId(newRestaurant.getId());
        userRepository.save(user);
    }
}
