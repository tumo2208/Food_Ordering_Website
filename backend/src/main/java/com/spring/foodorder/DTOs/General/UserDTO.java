package com.spring.foodorder.DTOs.General;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.spring.foodorder.Enums.Gender;
import com.spring.foodorder.Enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

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

    private UserRole role;

    private String restaurantId;

    private String requestId;

    private LocalDate createdAt;
}
