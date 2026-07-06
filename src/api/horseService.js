import { apiClient } from "./client";

export const getAllHorses = async () => {
    try {
        const token = localStorage.getItem('jwt_token');

        const response = await apiClient.get('/horses', {
            headers: {Authorization: `Bearer ${token}`}
        });

        return response.data
    } catch(error) {
        console.error('Error fetching horses:', error);
        throw error;
    }
};

export const createHorse = async (horseData) => {
    try {
        const response = await apiClient.post('/horses', horseData);
        return response.data;
    } catch(error) {
        console.error('Error creating horses:', error);
        throw error;
    }
}

export const deleteHorse = async (horseId) => {
    try {
        const response = await apiClient.delete(`/horses/${horseId}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting horses:', error);
        throw error;
    }
}

// export const getHorseLogs = async (horseId) => {
//     try {
//         const response = await apiClient.get(`feeding-logs/horse/${horseId}`);
//         return response.data;
//     } catch(error) {
//         console.error('Error fetching logs:', error);
//         return []; // Return empty array so our UI doesn't crash on a 404
//     }
// };