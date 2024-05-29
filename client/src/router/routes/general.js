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
        component: () => import("@/views/DartboardsPage.vue"),
        children: [
            {
                path: "",
                name: "DartboardsPage",
                component: () => import("@/components/DartboardsList.vue"),
                meta: {
                    protected: true,
                    title: "Dartpoint | My dartboards",
                    description: "List of all dartboards you previously connected to"
                }
            },
            {
                path: "/connect",
                name: "DartboardsConnect",
                component: () => import("@/components/DartboardsConnect.vue"),
                meta: {
                    protected: true,
                    title: "Dartpoint | Connect board",
                    description: "Connect to a new dartpoint device"
                }
            }
        ]
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
