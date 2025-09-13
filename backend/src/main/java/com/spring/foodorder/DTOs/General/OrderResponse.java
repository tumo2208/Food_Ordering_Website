package com.spring.foodorder.DTOs.General;

import com.spring.foodorder.Objects.OrderItem;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderResponse {
    private String orderId;
    private String userId;
    private List<OrderItem> items;
    private double totalPrice;
    private String status;
    private LocalDate createdAt;
    private LocalDate doneAt;
}
