export const authRoutes = [
    {
        path: "/auth/register",
        name: "RegisterPage",
        component: () => import("@/views/RegisterPage.vue"),
        meta: {
            protected: false,
            title: "Dartpoint | Register",
            description: "Don't have a dartpoint account? Create one right now!"
        }
    },
    {
        path: "/auth/login",
        name: "LoginPage",
        component: () => import("@/views/LoginPage.vue"),
        meta: {
            protected: false,
            title: "Dartpoint | Login",
            description: "Login to your dartpoint account"
        }
    }
]
