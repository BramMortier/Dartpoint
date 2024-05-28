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

export const userApi = {
    getUsers,
    getUser,
    deleteUser
}
