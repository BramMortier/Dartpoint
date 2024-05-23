import { apiClient } from "@/services/api/client"

const getUsers = async () => {
    return await apiClient.get("users").json()
}

const sendFriendRequest = async (requestBody) => {
    return await apiClient.post("users/friend-request", { json: requestBody }).json()
}

export const userApi = {
    sendFriendRequest,
    getUsers
}
