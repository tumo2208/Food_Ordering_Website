package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.LoginForm;
import com.spring.foodorder.DTOs.RegistrationUserForm;
import com.spring.foodorder.DTOs.UserDTO;
import com.spring.foodorder.Enums.UserRole;
import com.spring.foodorder.Exceptions.ResourceAlreadyExistsException;
import com.spring.foodorder.Exceptions.InvalidCredentialsException;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Objects.Address;
import com.spring.foodorder.Documents.User;
import com.spring.foodorder.Repositories.UserRepository;
import com.spring.foodorder.Security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenBlackListService tokenBlacklistService;

    // Method to map UserEntity to User DTO
    public UserDTO fromUser(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setCitizenId(user.getCitizenId());
        userDTO.setAddress(user.getAddress().getAddress());
        userDTO.setDistrict(user.getAddress().getDistrict());
        userDTO.setCity(user.getAddress().getCity());
        userDTO.setDob(user.getDob());
        userDTO.setGender(user.getGender());
        userDTO.setRole(user.getRole());
        userDTO.setRestaurantId(user.getRestaurantId());
        userDTO.setCreatedAt(user.getCreatedAt());
        return userDTO;
    }

    // Method to register a new user
    public void register(RegistrationUserForm registrationUserForm) {
        Optional<User> user = userRepository.findByEmail(registrationUserForm.getEmail());
        if (user.isPresent()) {
            throw new ResourceAlreadyExistsException("User with this email already exists.");
        }

        // Save new user
        User newUser = new User();
        newUser.setEmail(registrationUserForm.getEmail());
        newUser.setPassword(passwordEncoder.encode(registrationUserForm.getPassword()));
        newUser.setName(registrationUserForm.getName());
        newUser.setPhoneNumber(registrationUserForm.getPhoneNumber());
        newUser.setCitizenId(registrationUserForm.getCitizenId());
        newUser.setAddress(new Address(registrationUserForm.getAddress(),
                registrationUserForm.getDistrict(),
                registrationUserForm.getCity()));
        newUser.setDob(registrationUserForm.getDob());
        newUser.setGender(registrationUserForm.getGender());
        if (registrationUserForm.getRole() == null) {
            newUser.setRole(UserRole.CUSTOMER);
        } else {
            newUser.setRole(registrationUserForm.getRole());
        }
        newUser.setRole(registrationUserForm.getRole());
        userRepository.save(newUser);
    }

    // Method to log in a user
    public String login(LoginForm loginForm) {
        User user = userRepository.findByEmail(loginForm.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + loginForm.getEmail()));
        if (!passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password does not match");
        }
        return jwtUtils.generateToken(user);
    }

    // Method to log out a user
    public void logout(String token) {
        if (token != null) {
            long expiration = jwtUtils.getExpirationTime(token);
            tokenBlacklistService.blacklistToken(token, expiration);
        }
    }

    // Method to get the currently logged-in user
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    //Method to get user profile
    public UserDTO getUserProfile() {
        User currentUser = getCurrentUser();
        return fromUser(currentUser);
    }

    // Method to update user profile
    public void updateUserProfile(UserDTO updatedUser) {
        User currentUser = getCurrentUser();
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().equals(currentUser.getEmail())) {
            Optional<User> existingUser = userRepository.findByEmail(updatedUser.getEmail());
            if (existingUser.isPresent()) {
                throw new ResourceAlreadyExistsException("User with this email already exists.");
            }
            currentUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getName() != null) {
            currentUser.setName(updatedUser.getName());
        }
        if (updatedUser.getPhoneNumber() != null) {
            currentUser.setPhoneNumber(updatedUser.getPhoneNumber());
        }
        if (updatedUser.getCitizenId() != null) {
            currentUser.setCitizenId(updatedUser.getCitizenId());
        }

        currentUser.setAddress(new Address(updatedUser.getAddress(),
                updatedUser.getDistrict(),
                updatedUser.getCity()));

        if (updatedUser.getDob() != null) {
            currentUser.setDob(updatedUser.getDob());
        }
        if (updatedUser.getGender() != null) {
            currentUser.setGender(updatedUser.getGender());
        }
        userRepository.save(currentUser);
    }
}
