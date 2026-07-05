import { apiClient } from "./client";

export const getMyAccount = async () => {
    try {
        const token = localStorage.getItem('jwt_token');
        
        // Check if we have a token first but for test this is fine
        const response = await apiClient.get('users/me', {
            headers: {Authorization: `Bearer ${token}`}
        })

        const user = response.data;
        localStorage.setItem('user_info', JSON.stringify(user));

        return user
    } catch(err) {
        console.error('Error getting users account:', err);
        throw error;
    }
}