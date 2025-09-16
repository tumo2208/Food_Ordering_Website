package com.spring.foodorder.DTOs.General;

import com.spring.foodorder.Objects.OrderItem;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String userId;
    List<OrderItem> items;
    private String address;
}
