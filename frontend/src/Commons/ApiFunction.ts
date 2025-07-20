import type {MenuCategory, Restaurant, SearchOptions} from "./Type.ts";
import {menuCategories, restaurantData, smartSearch} from "./DataDummy.ts";

export const searchFunction = async (query:SearchOptions) => {
    const res = smartSearch(query);
    return Promise.resolve(res);
}

export const getRestaurantById = (id: number): Restaurant | undefined => {
    return restaurantData.find(restaurant => restaurant.id === id);
};

export const getMenuForRestaurant = (id: number): MenuCategory[] => {
    return menuCategories[id] || [];
};