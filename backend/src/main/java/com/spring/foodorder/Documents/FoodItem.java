package com.spring.foodorder.Documents;

import com.spring.foodorder.Enums.FoodType;
import com.spring.foodorder.Objects.Rating;
import com.spring.foodorder.Objects.SizeToPrice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "food_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndexes({
        @CompoundIndex(name = "restaurant_name_unique", def = "{'name': 1, 'restaurant_id': 1}", unique = true),
        @CompoundIndex(name = "name_desc_text", def = "{'name': 'text', 'description': 'text'}")
})
public class FoodItem {
    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("min_price")
    private double minPrice;

    @Field("size_to_prices")
    private List<SizeToPrice> sizeToPrices;

    @Field("description")
    private String description;

    @Field("cuisine_types")
    @Indexed
    private List<FoodType> cuisineTypes;

    @Field("img_url")
    private String imgUrl;

    @Field("rating")
    private Rating rating;

    @Field("restaurant_id")
    private String restaurantId;
}
