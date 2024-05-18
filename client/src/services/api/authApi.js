import { apiClient } from "@/services/api/client"

const register = async (requestBody) => {
    return await apiClient.url("/auth/register").post(requestBody).json()
}

const login = async (requestBody) => {
    return await apiClient.url("/auth/login").post(requestBody).json()
}

const logout = async () => {
    return await apiClient.url("/auth/logout").post().json()
}

export const authApi = {
    register,
    login,
    logout
}
