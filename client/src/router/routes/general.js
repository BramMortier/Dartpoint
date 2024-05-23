export const generalRoutes = [
    {
        path: "/playground",
        name: "playgroundPage",
        component: () => import("@/views/PlaygroundPage.vue"),
        meta: {
            protected: false,
            title: "Dartpoint | Playground",
            description: "Component playground"
        }
    },
    {
        path: "/dashboard",
        name: "DashboardPage",
        component: () => import("@/views/DashboardPage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | Dashboard",
            description: "Dartpoint mainscreen"
        }
    },
    {
        path: "/dartboards",
        name: "DartboardsPage",
        component: () => import("@/views/DartboardsPage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | My dartboards",
            description: "List of all dartboards you previously connected to"
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFoundPage.vue"),
        meta: {
            protected: false,
            title: "Dartpoint | 404",
            description: "Page does not exist"
        }
    }
]
