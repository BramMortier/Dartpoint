import { createRouter, createWebHistory } from "vue-router"

import { generalRoutes } from "@/router/routes/general"
import { profileRoutes } from "@/router/routes/profile"
import { gameRoutes } from "@/router/routes/game"
import { authRoutes } from "@/router/routes/auth"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...authRoutes, ...profileRoutes, ...gameRoutes, ...generalRoutes]
})

export default router
