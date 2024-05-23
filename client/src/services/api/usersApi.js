import { apiClient } from "@/services/api/client"

const getUsers = async () => {
    return await apiClient.get("users").json()
}

const createFriendRequest = async (requestBody) => {
    return await apiClient.post("users/friend-requests", { json: requestBody }).json()
}

const getFriendRequests = async (userId) => {
    return await apiClient.get(`users/${userId}/friend-requests`).json()
}

export const userApi = {
    getFriendRequests,
    createFriendRequest,
    getUsers
}
