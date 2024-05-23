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
    const { setUser } = useAuthStore()

    if (!to.meta.protected) return
    const { status, message, body } = await authApi.getAuth()

    setUser(body.user)
    console.log(message, body)

    if (status !== 200) {
        return { name: "loginPage" }
    }
})

export default router
