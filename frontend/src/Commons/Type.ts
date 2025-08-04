// export interface SearchOptions {
//     query: string;
// }
//
import {NationalFoodTypeMap} from "./DataDummy.ts";

export interface FoodType {
    id: number;
    name: string;
    image: string;
}

export interface FoodItem {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    discount?: number;
    favorite?: boolean;
    restaurantId?: string;
    restaurantName?: string;
}

export interface MenuCategory {
    id: number;
    name: string;
    items: MenuItem[];
}

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    discount?: number;
    favorite?: boolean;
}


export interface CuisineFilter {
    id: number;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
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
}

export type CuisineType = keyof typeof NationalFoodTypeMap;

export interface Restaurant {
    id: number;
    restaurantName: string;
    contactNumber: string;
    contactEmail: string;
    location: {
        address: string;
        district: string;
        city: string;
    }
    description: string;
    rating: {
        rating: number;
        numberOfRatings: number;
    };
    cuisineTypes: CuisineType[];
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
    imgUrl: string;
}


