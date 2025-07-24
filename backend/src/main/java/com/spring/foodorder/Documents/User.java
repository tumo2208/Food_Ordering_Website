package com.spring.foodorder.Documents;

import com.spring.foodorder.Enums.Gender;
import com.spring.foodorder.Enums.UserRole;
import com.spring.foodorder.Objects.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Document(collection = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    protected String id;

    @Field("email")
    @Indexed(unique = true)
    protected String email;

    @Field("password")
    protected String password;

    @Field("name")
    private String name;

    @Field("dob")
    private LocalDate dob;

    @Field("gender")
    private Gender gender;

    @Field("phone_number")
    @Indexed(unique = true)
    protected String phoneNumber;

    @Field("citizen_id")
    @Indexed(unique = true)
    protected String citizenId;

    @Field("address")
    protected Address address;

    @Field("role")
    protected UserRole role;

    @Field("restaurant_id")
    private String restaurantId;

    @Field("created_at")
    private final LocalDate createdAt = LocalDate.now();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}