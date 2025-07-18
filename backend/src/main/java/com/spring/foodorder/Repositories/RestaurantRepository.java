package com.spring.foodorder.Repositories;

import com.spring.foodorder.Models.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

    // Custom query methods can be defined here if needed
    // For example:
    // Optional<Restaurant> findByName(String name);
    // List<Restaurant> findByLocation(String location);
}
