// =============================================================================
// Imports
// =============================================================================
import { createRouter, createWebHistory } from "vue-router"

import { generalRoutes } from "@/router/routes/general"
import { profileRoutes } from "@/router/routes/profile"
import { gameRoutes } from "@/router/routes/game"
import { authRoutes } from "@/router/routes/auth"

import { authApi } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"
import { storeToRefs } from "pinia"

// =============================================================================
// Router configuration
// =============================================================================
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...authRoutes, ...profileRoutes, ...gameRoutes, ...generalRoutes]
})

// =============================================================================
// Navigation guard
// =============================================================================
router.beforeEach(async (to) => {
    const { authenticatedUser } = storeToRefs(useAuthStore())

    if (!to.meta.protected) return
    const { status, message, body } = await authApi.getAuth()

    if (status !== 200) return { name: "LoginPage" }

    authenticatedUser.value = body.authenticatedUser
    console.log(message, body)
})

export default router
