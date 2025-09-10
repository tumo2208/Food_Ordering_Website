package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.General.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private FoodService foodService;

    // Method to search restaurants and food items
    public List<SearchResponse> search(String query) {
        List<SearchResponse> restaurantResults = restaurantService.searchRestaurants(query)
                .stream()
                .map(restaurant -> new SearchResponse(restaurant.getId(), restaurant.getRestaurantName(), "restaurant", restaurant.getImgUrl()))
                .collect(Collectors.toList());

        List<SearchResponse> foodResults = foodService.searchFoodItems(query)
                .stream()
                .map(foodItem -> new SearchResponse(foodItem.getId(), foodItem.getName(), "dish", foodItem.getImgUrl()))
                .collect(Collectors.toList());
        List<SearchResponse> results = new ArrayList<>();
        results.addAll(restaurantResults);
        results.addAll(foodResults);
        return results;
    }
}
