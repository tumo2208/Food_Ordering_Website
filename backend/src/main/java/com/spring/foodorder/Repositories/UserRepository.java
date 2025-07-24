package com.spring.foodorder.Repositories;

import com.spring.foodorder.Documents.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods can be defined here if needed
    // For example:
    // Optional<User> findByEmail(String email);
    // List<User> findByRole(UserRole role);

    Optional<User> findByEmail(String email);
}
