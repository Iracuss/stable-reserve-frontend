import { apiClient } from "./client";

export const sendStableInvite = async (stableId, stableInviteData) => {
    try {
        const response = await apiClient.post(`stables/invites/${stableId}`, stableInviteData);

        return response.data
    } catch(error) {
        console.error('Error sending invite:', error);
        throw error;
    }
}

export const getAllUserInvites = async () => {
    try {
        const response = await apiClient.get(`stables/invites/me`);

        return response.data
    } catch(error) {
        console.error('Error getting invites:', error);
        throw error;
    }
}

export const acceptStableInvite = async (stableId, accept) => {
    try {
        const response = await apiClient.put(`stables/invites/${stableId}/accept`, accept);

        return response.data
    } catch(error) {
        console.error('Error accepting invite:', error);
        throw error;
    }
}