import { apiClient } from "./client";

export const getAllHorsesInStable = async (stableId) => {
    try {
        const token = localStorage.getItem('jwt_token');

        const response = await apiClient.get(`/horses/${stableId}`, {
            headers: {Authorization: `Bearer ${token}`}
        });

        return response.data
    } catch(error) {
        console.error('Error fetching horses:', error);
        throw error;
    }
};

export const createHorse = async (stableId, horseData) => {
    try {
        const response = await apiClient.post(`/horses/${stableId}`, horseData);
        return response.data;
    } catch(error) {
        console.error('Error creating horses:', error);
        throw error;
    }
}

export const deleteHorse = async (stableId, horseId) => {
    try {
        const response = await apiClient.delete(`/horses/${stableId}/${horseId}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting horses:', error);
        throw error;
    }
}

export const updateHorse = async (stableId, horseId, horseData) => {
    try {
        const response = await apiClient.put(`/horses/${stableId}/${horseId}`, horseData);
        return response.data;
    } catch(error) {
        console.error('Error updating horse:', error);
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