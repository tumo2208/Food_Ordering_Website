package com.spring.foodorder.DTOs;

import com.spring.foodorder.Objects.SizeToPrice;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class FoodItemDTO {
    @NotBlank(message = "Food item name is required")
    private String name;

    private List<SizeToPrice> sizeToPrices;
    private List<String> cuisineTypes;
    private String description;
    private MultipartFile image;
}
