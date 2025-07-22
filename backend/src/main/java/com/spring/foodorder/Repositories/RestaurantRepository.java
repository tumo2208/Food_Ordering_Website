package com.spring.foodorder.Repositories;

import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Models.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

    // Custom query methods can be defined here if needed
    // For example:
    // Optional<Restaurant> findByName(String name);
    // List<Restaurant> findByLocation(String location);

    List<Restaurant> findByRestaurantNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String nameKeyword,
            String descKeyword
    );

    Optional<Restaurant> findByContactEmail(String contactEmail);

    List<Restaurant> findByCuisineTypesIn(List<FoodType> cuisineTypes);
}
