import { apiClient } from "./client";

export const getMyAccount = async () => {
    try {
        // Check if we have a token first but for test this is fine
        const response = await apiClient.get('users/me');

        const user = response.data;
        localStorage.setItem('user_info', JSON.stringify(user));

        return user
    } catch(error) {
        console.error('Error getting users account:', error);
        throw error;
    }
}

export const updateAccount = async (updatedUser) => {
    try {
        const response = await apiClient.put('/users/me', updatedUser);

        const token = response.data;
        localStorage.setItem('jwt_token', token);

        return token;
    } catch(error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteAccount = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}