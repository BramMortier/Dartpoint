import { apiClient } from "@/services/api/client"

const getBoards = async () => {
    return await apiClient.get("boards").json()
}

const connect = async (requestBody) => {
    return await apiClient.post("boards/connect", { json: requestBody }).json()
}

export const boardsApi = {
    getBoards,
    connect
}
