import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/register",
            name: "registerPage",
            component: () => import("@/views/RegisterPage.vue")
        },
        {
            path: "/login",
            name: "loginPage",
            component: () => import("@/views/LoginPage.vue")
        },
        {
            path: "/playground",
            name: "playgroundPage",
            component: () => import("@/views/PlaygroundPage.vue")
        }
    ]
})

export default router
