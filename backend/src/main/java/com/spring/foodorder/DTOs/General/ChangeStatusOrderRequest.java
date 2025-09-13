package com.spring.foodorder.DTOs.General;

import com.spring.foodorder.Enums.OrderStatus;
import lombok.Data;

@Data
public class ChangeStatusOrderRequest {
    private String orderId;
    private OrderStatus status;
}
