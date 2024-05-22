import { apiClient } from "@/services/api/client"

const getAuth = async () => {
    return await apiClient.get("auth").json()
}

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
    getAuth,
    register,
    login,
    logout
}
