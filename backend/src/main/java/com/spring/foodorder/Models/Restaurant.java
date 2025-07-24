package com.spring.foodorder.Models;

import com.spring.foodorder.Enums.FoodType;
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

@Document(collection = "restaurants")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@CompoundIndexes({
        @CompoundIndex(name = "name_desc_text", def = "{'restaurant_name': 'text', 'description': 'text'}")
})
public class Restaurant {
    @Id
    private String id;

    @Field("owner_id")
    @Indexed
    private String ownerId;

    @Field("name")
    private String restaurantName;

    @Field("contact_number")
    private String contactNumber;

    @Field("contact_email")
    @Indexed(unique = true)
    private String contactEmail;

    @Field("location")
    private Address location;

    @Field("description")
    private String description;

    @Field("operating_hours")
    private String operatingHours;

    @Field("rating")
    private Rating rating;

    @Field("cuisine_types")
    @Indexed
    private List<FoodType> cuisineTypes;

    @Field("img_url")
    private String imgUrl;
}
