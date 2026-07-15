import { apiClient } from "./client";

export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        const token = response.data;

        if(token) {
            localStorage.setItem("jwt_token", token);

            // localStorage.setItem("user_info", JSON.stringify(user));
        }

        return response.data
    } catch(error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const register = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);

        return response.data
    } catch(error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const forgotPassword = async (userEmail) => {
    try {
        const response = await apiClient.post('/auth/forgot-password', userEmail);

        return response.data; // Shouldn't return anything
    } catch(error) {
        console.error('Error with forgot password:', error);
        throw error;
    }
}

export const resetPassword = async (resetPasswordData) => {
    try {
        const response = await apiClient.post('/auth/reset-password', resetPasswordData);

        return response.data; // Shouldn't return anything
    } catch(error) {
        console.error('Error with reset password:', error);
        throw error;
    }
}