package com.spring.foodorder.DTOs.Auth;

import lombok.Data;

@Data
public class ChangePasswordForm {
    private String oldPassword;
    private String newPassword;
}
