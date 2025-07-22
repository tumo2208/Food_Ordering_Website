package com.spring.foodorder.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.foodorder.Enums.Gender;
import com.spring.foodorder.Enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegistrationUserForm {
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*_])[A-Za-z\\d!@#$%^&*_]{6,}$",
            message = "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    private String password;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 digits long")
    private String phoneNumber;

    @NotBlank(message = "Address is required")
    private String address;
    @NotBlank(message = "District is required")
    private String district;
    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Citizen ID is required")
    private String citizenId;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Ho_Chi_Minh")
    private LocalDate dob;

    private Gender gender;

    private UserRole role = UserRole.CUSTOMER;
}
