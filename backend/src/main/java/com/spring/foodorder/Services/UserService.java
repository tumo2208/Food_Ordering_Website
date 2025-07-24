package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.LoginForm;
import com.spring.foodorder.DTOs.LoginResponse;
import com.spring.foodorder.DTOs.RegistrationUserForm;
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
