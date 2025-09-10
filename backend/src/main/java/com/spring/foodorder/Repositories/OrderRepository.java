package com.spring.foodorder.Repositories;

import com.spring.foodorder.Documents.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

}
