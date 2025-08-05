package com.spring.foodorder.Repositories;

import com.spring.foodorder.Documents.PendingRestaurantRegisterRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingRestaurantRegisterRequestRepository extends
        MongoRepository<PendingRestaurantRegisterRequest, String> {

    // Custom query methods can be defined here if needed
    // For example:
    // List<PendingRestaurantRegisterRequest> findByStatus(StatusRegisterRestaurant status);
    // Optional<PendingRestaurantRegisterRequest> findByOwnerId(String ownerId);
}
