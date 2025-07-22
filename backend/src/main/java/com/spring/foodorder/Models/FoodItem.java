package com.spring.foodorder.Models;

import com.spring.foodorder.Enums.FoodType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "food_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodItem {
    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("price")
    private double price;

    @Field("description")
    private String description;

    @Field("cuisine_types")
    private List<FoodType> cuisineTypes;

    @Field("img_url")
    private String imgUrl;

    @Field("rating")
    private Rating rating;

    @Field("restaurant_id")
    private String restaurantId;
}
