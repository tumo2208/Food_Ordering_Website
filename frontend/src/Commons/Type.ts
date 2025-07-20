export interface SearchOptions {
    query: string;
}

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

export interface Restaurant {
    id: number;
    name: string;
    image: string;
    rating: number;
    ratingCount: number;
    cuisineType: string;
    priceRange: string;
    address: string;
    distance: number;
    deliveryTime: number;
    minOrder: number;
    favorite?: boolean;
    phone?:string
}

export interface CuisineFilter {
    id: number;
    name: string;
}