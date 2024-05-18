export const authRoutes = [
    {
        path: "/auth/register",
        name: "registerPage",
        component: () => import("@/views/RegisterPage.vue")
    },
    {
        path: "/auth/login",
        name: "loginPage",
        component: () => import("@/views/LoginPage.vue")
    }
]
