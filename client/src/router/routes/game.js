export const gameRoutes = [
    {
        path: "/game/enter-join-code",
        name: "EnterGameCodePage",
        component: () => import("@/views/EnterGameCodePage.vue")
    },
    {
        path: "/game/:id",
        name: "GamePage",
        component: () => import("@/views/GamePage.vue")
    },
    {
        path: "/game/:id/settings",
        name: "GameSettingsPage",
        component: () => import("@/views/GameSettingsPage.vue")
    }
]
