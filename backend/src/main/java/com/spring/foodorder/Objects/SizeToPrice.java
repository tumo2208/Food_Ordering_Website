package com.spring.foodorder.Objects;

import com.spring.foodorder.Enums.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SizeToPrice {
    private Size size;
    private double price;
}
