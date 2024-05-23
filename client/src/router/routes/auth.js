export const authRoutes = [
    {
        path: "/auth/register",
        name: "registerPage",
        component: () => import("@/views/RegisterPage.vue"),
        meta: {
            protected: false,
            title: "Dartpoint | Register",
            description: "Don't have a dartpoint account? Create one right now!"
        }
    },
    {
        path: "/auth/login",
        name: "loginPage",
        component: () => import("@/views/LoginPage.vue"),
        meta: {
            protected: false,
            title: "Dartpoint | Login",
            description: "Login to your dartpoint account"
        }
    }
]
