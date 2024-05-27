import { apiClient } from "@/services/api/client"

const getUsers = async () => {
    return await apiClient.get("users").json()
}

const getUser = async (userId) => {
    return await apiClient.get(`users/${userId}`).json()
}

const deleteUser = async (userId) => {
    return await apiClient.delete(`users/${userId}`).json()
}

const createFriendRequest = async (requestBody) => {
    return await apiClient.post("users/friend-requests", { json: requestBody }).json()
}

const getFriendRequests = async (userId) => {
    return await apiClient.get(`users/${userId}/friend-requests`).json()
}

const deleteFriendRequest = async (userId, friendId) => {
    return await apiClient.delete(`users/${userId}/friend-requests/${friendId}`).json()
}

export const userApi = {
    getFriendRequests,
    createFriendRequest,
    deleteFriendRequest,
    getUsers,
    getUser,
    deleteUser
}
