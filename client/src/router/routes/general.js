export const generalRoutes = [
    {
        path: "/playground",
        name: "playgroundPage",
        component: () => import("@/views/PlaygroundPage.vue")
    },
    {
        path: "/dashboard",
        name: "DashboardPage",
        component: () => import("@/views/DashboardPage.vue")
    },
    {
        path: "/dartboards",
        name: "DartboardsPage",
        component: () => import("@/views/DartboardsPage.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFoundPage.vue")
    }
]
