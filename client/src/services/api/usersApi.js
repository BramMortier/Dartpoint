import { apiClient } from "@/services/api/client"

const getUsers = async () => {
    return apiClient.get("/users").json()
}

export const userApi = {
    getUsers
}
