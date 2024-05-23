import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
    const authenticatedUser = ref(null)

    const setUser = (user) => {
        authenticatedUser.value = user
    }

    return { authenticatedUser, setUser }
})
