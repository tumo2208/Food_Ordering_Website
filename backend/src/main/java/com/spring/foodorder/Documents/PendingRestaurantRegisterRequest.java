package com.spring.foodorder.Documents;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "pending_restaurant_register_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingRestaurantRegisterRequest {
    @Id
    private String id;

    @Field("owner_id")
    private String ownerId;

    @Field("restaurant_name")
    private String restaurantName;

    @Field("contact_number")
    private String contactNumber;

    @Field("contact_email")
    private String contactEmail;

    @Field("location_address")
    private String locationAddress;

    @Field("location_district")
    private String locationDistrict;

    @Field("location_city")
    private String locationCity;

    @Field("description")
    private String description;

    @Field("operating_hours")
    private String operatingHours;

    @Field("cuisine_types")
    private List<String> cuisineTypes;

    @Field("restaurant_image_url")
    private String restaurantImageUrl;

    @Field("created_at")
    private final LocalDate createdAt = LocalDate.now();
}
