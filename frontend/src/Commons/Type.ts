import {CookingFoodTypeMap, FoodTypeMap, NationalFoodTypeMap} from "./DataDummy.ts";

export type NationalCuisineType = keyof typeof NationalFoodTypeMap;
export type CookingCuisineType = keyof typeof CookingFoodTypeMap;
export type CuisineType = keyof typeof FoodTypeMap

export interface SizeToPrice {
    size: string;
    price: number;
}

export interface Rating {
    rating: number;
    numberOfRatings: number;
}

export interface LoginData {
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface RegistrationUserData {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    address: string;
    district: string;
    city: string;
    citizenId: string;
    dob: string;
    gender: "MALE" | "FEMALE" | "OTHER";
}

export interface User {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    address: string;
    district: string;
    city: string;
    citizenId: string;
    dob: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    role: "CUSTOMER" | "RESTAURANT_OWNER" | "ADMIN";
    restaurantId?: string;
    requestId?: string;
}

export interface Restaurant {
    id: string;
    restaurantName: string;
    contactNumber: string;
    contactEmail: string;
    location: {
        address: string;
        district: string;
        city: string;
    }
    description: string;
    operatingHours: string;
    rating: Rating;
    cuisineTypes: CuisineType[];
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
    imgUrl: string;
}

export interface FoodItem {
    id: string;
    name: string;
    minPrice: number;
    sizeToPrices: SizeToPrice[];
    description: string;
    cuisineTypes: CuisineType[];
    imgUrl: string;
    rating: Rating;
    restaurantId: string;
}

export interface RestaurantRegistrationData {
    restaurantName: string;
    contactNumber: string;
    contactEmail: string;
    locationAddress: string;
    locationDistrict: string;
    locationCity: string;
    description: string;
    operatingHours: string;
    cuisineTypes: CuisineType[];
    restaurantImage?: File | null;
}


