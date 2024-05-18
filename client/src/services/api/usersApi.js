import { apiClient } from "@/services/api/client"

const getUsers = async () => {
    return await apiClient.url("/users").get().json()
}

export const userApi = {
    getUsers
}
