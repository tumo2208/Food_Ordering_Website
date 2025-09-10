package com.spring.foodorder.DTOs.General;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResponse {
    private String id;
    private String name;
    private String type;
    private String image;
}
