package com.spring.foodorder.DTOs;

import lombok.Data;

@Data
public class ChangePasswordForm {
    private String oldPassword;
    private String newPassword;
}
