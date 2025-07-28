package com.spring.foodorder.DTOs;

import com.spring.foodorder.Documents.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private String role;
    private UserDTO user;
}
