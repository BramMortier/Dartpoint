// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { ref } from "vue"

import cryptoRandomString from "crypto-random-string"

// =============================================================================
// Store configuration
// =============================================================================
export const useNotificationStore = defineStore("notification", () => {
    const notifications = ref([])

    const addSuccesNotification = ({ message, type = "succes", removeDelay = 2000 }) => {
        const id = cryptoRandomString({ length: 10 })

        notifications.value.push({ id, message, type, removeDelay })
        setTimeout(() => removeNotification(id), removeDelay)
    }

    const addErrorNotification = ({ message, type = "error", removeDelay = 4000 }) => {
        const id = cryptoRandomString({ length: 10 })

        notifications.value.push({ id, message, type, removeDelay })
        setTimeout(() => removeNotification(id), removeDelay)
    }

    const removeNotification = (id) => {
        notifications.value = notifications.value.filter((notification) => notification.id !== id)
    }

    return {
        notifications,
        addSuccesNotification,
        addErrorNotification,
        removeNotification
    }
})
