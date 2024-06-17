export const gameRoutes = [
    {
        path: "/game/enter-join-code",
        name: "EnterGameCodePage",
        component: () => import("@/views/EnterGameCodePage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | Join game",
            description: "Enter game code to join"
        }
    },
    {
        path: "/game/:id",
        name: "GamePage",
        component: () => import("@/views/GamePage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | Game",
            description: "Ongoing dartpoint game"
        }
    },
    {
        path: "/game/:id/settings",
        component: () => import("@/views/GameSettingsPage.vue"),
        children: [
            {
                path: "",
                name: "GameSettingsPage",
                component: () => import("@/components/GameConfiguration.vue"),
                meta: {
                    protected: true,
                    title: "Dartpoint | Game settings",
                    description: "Configure game settings"
                }
            },
            {
                path: "add-guest",
                name: "GameAddGuest",
                component: () => import("@/components/GameAddGuest.vue"),
                meta: {
                    protected: true,
                    title: "Dartpoint | Add a guest",
                    description: "Add a guest"
                }
            }
        ]
    }
]
