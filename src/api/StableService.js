import { apiClient } from "./client";

export const getAllUserStables = async () => {
    try {
        const response = await apiClient.get('/stables');

        return response.data
    } catch(error) {
        console.error('Error getting users stables:', error);
        throw error;
    }
}

export const deleteStable = async (stableId) => {
    try {
        const response = await apiClient.delete(`/stables/${stableId}`);

        return response.data
    } catch(error) {
        console.error('Error deleting user stable:', error);
        throw error;
    }
}

export const updateStable = async (stableId, updatedStable) => {
    try {
        const response = await apiClient.put(`/stables/${stableId}`, updatedStable);

        return response.data
    } catch(error) {
        console.error('Error updating user stable:', error);
        throw error;
    }
}

export const createStable = async (stableData) => {
    try {
        const response = await apiClient.post('/stables', stableData);

        return response.data
    } catch(error) {
        console.error('Error creating stable:', error);
        throw error;
    }
}