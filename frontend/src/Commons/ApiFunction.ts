import type {LoginData, OrderRequest, RegistrationUserData, RestaurantRegistrationData, User} from "./Type.ts";
import axios from 'axios';
import qs from 'qs'

export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

/**
 * Authentication function
 */

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
        return await api.post('/auth/login', loginData, { withCredentials: true });
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function logout() {
    try {
        return await api.get('/auth/logout', { withCredentials: true });
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

/**
 * User functions
 */

export async function getUserProfile() {
    try {
        const response = await api.get('/user/profile', { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Get user profile error:', error);
        throw error;
    }
}

export async function updateUserProfile(userData: User) {
    try {
        console.log(userData);
        const response = await api.put('/user/update', userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Update user profile error:', error);
        throw error;
    }
}

export async function changePassword(oldPassword: string, newPassword: string) {
    return await api.put('/user/changePassword', {
        oldPassword: oldPassword,
        newPassword: newPassword
    }, { withCredentials: true });
}

/**
 * Customer functions
 */

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

export async function getAllRestaurants() {
    try {
        const response = await api.get("/restaurant/getByCuisineType");
        return response.data;
    } catch (error) {
        console.error('Get restaurants by cuisine type failed: ', error);
        throw error;
    }
}

export async function getRestaurantsByCuisineType(cuisineType: string) {
    try {
        const response = await api.get("/restaurant/getByCuisineType", {
            params: { cuisineType: cuisineType}
        });
        return response.data;
    } catch (error) {
        console.error('Get restaurants by cuisine type failed: ', error);
        throw error;
    }
}

export async function getRestaurantsByCuisineTypes(cuisineType: string[]) {
    try {
        const response = await api.get("/restaurant/getByCuisineType", {
            params: { cuisineType: cuisineType}
        });
        return response.data;
    } catch (error) {
        console.error('Get restaurants by cuisine type failed: ', error);
        throw error;
    }
}

export async function getRestaurantById(restaurantId: string) {
    try {
        const response = await api.get(`restaurant/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error('Get restaurant by id failed: ', error);
        throw error;
    }
}

export async function getFoodByFoodType(cuisineType: string) {
    try {
        const response = await api.get(`/food/getByRestaurant&CuisineType` , {
            params: {
                cuisineTypes: cuisineType
            }
        });
        return response.data.foodItems;
    } catch (error) {
        console.error('Get food by cuisine type failed: ', error);
        throw error;
    }
}

export async function getFoodByRestaurantIdAndFoodType(restaurantId: string, cuisineType: string) {
    try {
        const response = await api.get(`/food/getByRestaurant&CuisineType`, {
            params: {
                restaurantId: restaurantId,
                cuisineTypes: cuisineType
            }
        });
        return response.data.foodItems;
    } catch (error) {
        console.error('Get food by restaurant id and cuisine type failed: ', error);
        throw error;
    }
}

export async function getFoodByRestaurantIdAndFoodTypes(restaurantId: string, cuisineTypes: string[]) {
    try {
        const response = await api.get(`/food/getByRestaurant&CuisineType`, {
            params: {
                restaurantId: restaurantId,
                cuisineTypes: cuisineTypes
            },
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'repeat' })
        });
        return response.data.foodItems;
    } catch (error) {
        console.error('Get food by restaurant id and cuisine types failed: ', error);
        throw error;
    }
}

export async function placeOrder(order: OrderRequest) {
    try {
        return await api.post('/orders/place', order, { withCredentials: true });
    } catch (error) {
        console.error('Place order error:', error);
        throw error;
    }
}

export async function getOrderDetails(orderId: string) {
    try {
        return await api.get(`/user/order/${orderId}`, { withCredentials: true });
    } catch (error) {
        console.error('Get order details error:', error);
        throw error;
    }
}

/**
 * Restaurant owner functions
 */

export async function registerRestaurantOwner(registrationData: RestaurantRegistrationData) {
    try {
        const form = new FormData();
        form.append('restaurantName', registrationData.restaurantName);
        form.append('contactNumber', registrationData.contactNumber);
        form.append('contactEmail', registrationData.contactEmail);
        form.append('locationAddress', registrationData.locationAddress);
        form.append('locationDistrict', registrationData.locationDistrict);
        form.append('locationCity', registrationData.locationCity);
        form.append('description', registrationData.description);
        form.append('operatingHours', registrationData.operatingHours);
        form.append('cuisineTypes', JSON.stringify(registrationData.cuisineTypes));
        if (registrationData.restaurantImage) {
            form.append('restaurantImage', registrationData.restaurantImage);
        }
        return await api.post('/restaurant/register', form, { withCredentials: true });
    } catch (error) {
        console.error('Restaurant owner registration error:', error);
        throw error;
    }
}


/**
 * Admin functions
 */

export async function getAllRestaurantRegistrationRequests() {
    try {
        const response = await api.get("/admin/requests", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Get restaurant registration requests failed: ', error);
        throw error;
    }
}

export async function approveRestaurantRegistration(requestId: string, status: "APPROVED" | "REJECTED") {
    try {
        return await api.post(`/admin/approveRequest`, {
            requestId: requestId,
            status: status
        }, { withCredentials: true });
    } catch (error) {
        console.error('Approve restaurant registration request failed: ', error);
        throw error;
    }
}