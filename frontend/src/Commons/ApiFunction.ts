import type {LoginData, MenuCategory, RegistrationUserData, Restaurant, User} from "./Type.ts";
import {menuCategories, restaurantData} from "./DataDummy.ts";

// export const searchFunction = async (query:SearchOptions) => {
//     const res = smartSearch(query);
//     return Promise.resolve(res);
// }

export const getRestaurantById = (id: number): Restaurant | undefined => {
    return restaurantData.find(restaurant => restaurant.id === id);
};

export const getMenuForRestaurant = (id: number): MenuCategory[] => {
    return menuCategories[id] || [];
};

import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
}

export async function register(registrationData:RegistrationUserData) {
    try {
        return await api.post('/auth/register', registrationData);
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

export async function login(loginData:LoginData) {
    try {
        return await api.post('/auth/login', loginData);
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
}

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
}

export function isRestaurantOwner() {
    const role = localStorage.getItem('role');
    return role === 'RESTAURANT_OWNER';
}

export async function getUserProfile() {
    try {
        const response = await api.get('/user/profile', {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Get user profile error:', error);
        throw error;
    }
}

export async function updateUserProfile(userData: User) {
    try {
        const response = await api.put('/user/update', userData, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Update user profile error:', error);
        throw error;
    }
}

export async function searchFunction(query: String) {
    try {
        const response = await api.get("/search/search", {
            params: { query: query }
        });
        return response.data;
    } catch (error) {
        console.error('Search failed: ', error);
        throw error;
    }
}