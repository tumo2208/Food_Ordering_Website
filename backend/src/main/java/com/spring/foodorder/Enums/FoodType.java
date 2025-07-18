package com.spring.foodorder.Enums;

import java.util.HashMap;
import java.util.Map;

public enum FoodType {
    RICE("Cơm"),
    NOODLE_SOUP("Bún/Phở/Miến"),
    CAKE("Bánh ngọt"),
    DRINK("Đồ uống"),
    DESSERT("Tráng miệng"),
    FAST_FOOD("Đồ ăn nhanh"),
    HOTPOT_BBQ("Lẩu & Nướng"),
    SEAFOOD("Hải sản"),
    MEAT_FOOD("Món ăn từ thịt");

    private final String vietnameseName;

    private static final Map<String, FoodType> VIETNAMESE_TO_ENUM = new HashMap<>();

    static {
        for (FoodType type : values()) {
            VIETNAMESE_TO_ENUM.put(type.vietnameseName, type);
        }
    }

    FoodType(String vietnameseName) {
        this.vietnameseName = vietnameseName;
    }

    public String getVietnameseName() {
        return vietnameseName;
    }

    public static FoodType fromVietnameseName(String vietnameseName) {
        return VIETNAMESE_TO_ENUM.get(vietnameseName);
    }
}
