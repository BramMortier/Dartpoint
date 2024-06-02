import { apiClient } from "@/services/api/client"

const getFriendRequests = async (queryParams = {}) => {
    const queryParamsString = new URLSearchParams(queryParams).toString()

    return await apiClient.get(`friend-requests?${queryParamsString}`).json()
}

const createFriendRequest = async (requestBody) => {
    return await apiClient.post("friend-requests", { json: requestBody }).json()
}

const deleteFriendRequest = async (friendId) => {
    return await apiClient.delete(`friend-requests/${friendId}`).json()
}

const patchFriendRequest = async (friendId, requestBody) => {
    return await apiClient.patch(`friend-requests/${friendId}`, { json: requestBody }).json()
}

export const friendRequestsApi = {
    getFriendRequests,
    createFriendRequest,
    deleteFriendRequest,
    patchFriendRequest
}
