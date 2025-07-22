package com.spring.foodorder.DTOs;

import com.spring.foodorder.Enums.FoodType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class FoodItemDTO {
    @NotBlank(message = "Food item name is required")
    private String name;

    private double price;
    private List<String> cuisineTypes;
    private String description;
    private MultipartFile image;
}
