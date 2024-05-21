import { apiClient } from "@/services/api/client"

const register = async (requestBody) => {
    return await apiClient.post("auth/register", { json: requestBody }).json()
}

const login = async (requestBody) => {
    return await apiClient.post("auth/login", { json: requestBody }).json()
}

const logout = async () => {
    return await apiClient.post("auth/logout").json()
}

export const authApi = {
    register,
    login,
    logout
}
