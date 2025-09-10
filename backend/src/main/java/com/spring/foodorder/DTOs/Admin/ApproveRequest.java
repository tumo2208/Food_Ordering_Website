package com.spring.foodorder.DTOs.Admin;

import lombok.Data;

@Data
public class ApproveRequest {
    private String requestId;
    private String status;
}
