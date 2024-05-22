import ky from "ky"

export const apiClient = ky.create({
    prefixUrl: "http://localhost:3000",
    throwHttpErrors: false,
    credentials: "include"
})
