import { defineStore } from "pinia"
import { ref } from "vue"

export const useNotificationStore = defineStore("notification", () => {
    const notifications = ref([])

    const addNotification = ({ message, type, removeDelay }) => {
        console.log("adding notification")

        notifications.value.push({ message, type, removeDelay })

        setTimeout(() => {
            notifications.value.shift()
        }, removeDelay)
    }

    return { notifications, addNotification }
})
