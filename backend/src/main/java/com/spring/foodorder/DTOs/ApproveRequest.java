package com.spring.foodorder.DTOs;

import lombok.Data;

@Data
public class ApproveRequest {
    private String requestId;
    private String status;
}
