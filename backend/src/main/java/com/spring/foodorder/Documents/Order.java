package com.spring.foodorder.Documents;

import com.spring.foodorder.Enums.OrderStatus;
import com.spring.foodorder.Objects.OrderItem;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("items")
    List<OrderItem> items;

    @Field("total_price")
    private double totalPrice;

    @Field("status")
    private OrderStatus status;

    @Field("created_at")
    private final LocalDate createdAt = LocalDate.now();
}
