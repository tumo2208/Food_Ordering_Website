package com.spring.foodorder.Enums;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public enum FoodType {
    // Cooking methods
    RICE("Cơm", "Cooking"),
    NOODLE_SOUP("Bún/Phở/Miến", "Cooking"),
    CAKE("Bánh ngọt", "Cooking"),
    DRINK("Đồ uống", "Cooking"),
    DESSERT("Tráng miệng", "Cooking"),
    FAST_FOOD("Đồ ăn nhanh", "Cooking"),
    HOTPOT_BBQ("Lẩu & Nướng", "Cooking"),
    SEAFOOD("Hải sản", "Cooking"),
    MEAT_FOOD("Món ăn từ thịt", "Cooking"),

    // National methods
    CHINESE("Trung Quốc", "National"),
    JAPANESE("Nhật Bản", "National"),
    KOREAN("Hàn Quốc", "National"),
    THAI("Thái Lan", "National"),
    INDIAN("Ấn Độ", "National"),
    VIETNAMESE("Việt Nam", "National"),
    WESTERN("Âu Mỹ", "National"),
    MIDDLE_EASTERN("Trung Đông", "National"),
    MEXICAN("Mexico", "National"),
    ITALIAN("Ý", "National");

    private final String vietnameseName;
    private final String category;

    private static final Map<String, FoodType> VIETNAMESE_TO_ENUM = new HashMap<>();

    static {
        for (FoodType type : values()) {
            VIETNAMESE_TO_ENUM.put(type.vietnameseName, type);
        }
    }

    FoodType(String vietnameseName, String category) {
        this.vietnameseName = vietnameseName;
        this.category = category;
    }

    public String getVietnameseName() {
        return vietnameseName;
    }

    public String getCategory() {
        return category;
    }

    public static FoodType fromVietnameseName(String vietnameseName) {
        return VIETNAMESE_TO_ENUM.get(vietnameseName);
    }

    // Lọc theo category
    public static List<FoodType> getByCategory(String category) {
        return Arrays.stream(values())
                .filter(type -> type.category.equals(category))
                .collect(Collectors.toList());
    }
}
