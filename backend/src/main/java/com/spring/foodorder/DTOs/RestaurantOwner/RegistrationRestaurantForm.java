package com.spring.foodorder.DTOs.RestaurantOwner;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class RegistrationRestaurantForm {
    @NotBlank(message = "Restaurant name is required")
    private String restaurantName;

    @NotBlank(message = "Contact number is required")
    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 digits long")
    private String contactNumber;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid contact email format")
    private String contactEmail;

    @NotBlank(message = "Location address is required")
    private String locationAddress;

    @NotBlank(message = "Location district is required")
    private String locationDistrict;

    @NotBlank(message = "Location city is required")
    private String locationCity;

    private String description;

    @NotBlank(message = "Operating hours are required")
    @Pattern(
            regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9] - ([01]?[0-9]|2[0-3]):[0-5][0-9]$",
            message = "Operating hours must be in format 'HH:MM - HH:MM' with valid 24-hour times"
    )
    private String operatingHours;
    private List<String> cuisineTypes;
    private MultipartFile restaurantImage;
}
