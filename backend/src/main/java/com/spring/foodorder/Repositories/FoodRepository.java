package com.spring.foodorder.Repositories;

import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Documents.FoodItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends MongoRepository<FoodItem, String> {

    // Custom query methods can be defined here if needed
    // For example:
    // List<Food> findByCategory(String category);
    // List<Food> findByRestaurantId(String restaurantId);

    List<FoodItem> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String nameKeyword,
            String descKeyword
    );

    Optional<FoodItem> findByNameAndRestaurantId(String name, String restaurantId);

    List<FoodItem> findByRestaurantIdAndCuisineTypesIn(
            String restaurantId,
            List<FoodType> cuisineTypes
    );

    List<FoodItem> findByRestaurantId(String restaurantId);

    List<FoodItem> findByCuisineTypesIn(List<FoodType> cuisineTypes);

    @Query("{ 'cuisineTypes': { $all: ?0 } }")
    List<FoodItem> findByRestaurantIdAndCuisineTypesContainingAll(
            String restaurantId,
            List<FoodType> cuisineTypes
    );
}
