package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.LoginForm;
import com.spring.foodorder.DTOs.LoginResponse;
import com.spring.foodorder.DTOs.RegistrationForm;
import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Enums.UserRole;
import com.spring.foodorder.Exceptions.InvalidCredentialsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Models.Address;
import com.spring.foodorder.Models.Restaurant;
import com.spring.foodorder.Models.User;
import com.spring.foodorder.Repositories.RestaurantRepository;
import com.spring.foodorder.Repositories.UserRepository;
import com.spring.foodorder.Security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    // Method to register a new user
    public void register(RegistrationForm registrationForm) {
        Optional<User> user = userRepository.findByEmail(registrationForm.getEmail());
        if (user.isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        // Save new user
        User newUser = new User();
        newUser.setEmail(registrationForm.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationForm.getPassword()));
        newUser.setName(registrationForm.getName());
        newUser.setPhoneNumber(registrationForm.getPhoneNumber());
        newUser.setCitizenId(registrationForm.getCitizenId());
        newUser.setAddress(new Address(registrationForm.getAddress(),
                registrationForm.getDistrict(),
                registrationForm.getCity()));
        newUser.setDob(registrationForm.getDob());
        newUser.setGender(registrationForm.getGender());
        newUser.setRole(registrationForm.getRole());
        userRepository.save(newUser);

        // If the user is a restaurant owner, create a restaurant entry
        if (registrationForm.getRole() == UserRole.RESTAURANT_OWNER) {
            Restaurant restaurant = new Restaurant();
            restaurant.setOwner(newUser);
            restaurant.setRestaurantName(registrationForm.getRestaurantName());
            restaurant.setContactNumber(registrationForm.getContactNumber());
            restaurant.setContactEmail(registrationForm.getContactEmail());
            restaurant.setDescription(registrationForm.getDescription());
            restaurant.setLocation(new Address(registrationForm.getLocationAddress(),
                    registrationForm.getLocationDistrict(),
                    registrationForm.getLocationCity()));
            restaurant.setOperatingHours(registrationForm.getOperatingHours());
            restaurant.setCuisineTypes(registrationForm.getCuisineTypes().stream()
                    .map(FoodType::fromVietnameseName).collect(Collectors.toList()));

            // Handle image upload if provided
            if (registrationForm.getRestaurantImage() != null && !registrationForm.getRestaurantImage().isEmpty()) {
                String imageUrl = cloudinaryService.uploadImage(registrationForm.getRestaurantImage(),
                        registrationForm.getRestaurantName());
                restaurant.setImgUrl(imageUrl);
            }
            restaurantRepository.save(restaurant);
        }
    }

    // Method to log in a user
    public LoginResponse login(LoginForm loginForm) {
        User user = userRepository.findByEmail(loginForm.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + loginForm.getEmail()));
        if (!passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password does not match");
        }
        String token = jwtUtils.generateToken(user);
        return new LoginResponse(token, user.getRole().name());
    }

    // Method to get the currently logged-in user
    public User getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
