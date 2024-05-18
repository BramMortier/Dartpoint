export const profileRoutes = [
    {
        path: "/profile",
        name: "ProfilePage",
        component: () => import("@/views/ProfilePage.vue")
    },
    {
        path: "/profile/challanges",
        name: "ChallangesPage",
        component: () => import("@/views/ChallangesPage.vue")
    },
    {
        path: "/profile/friends",
        name: "FriendsPage",
        component: () => import("@/views/FriendsPage.vue")
    },
    {
        path: "/profile/games",
        name: "GamesHistoryPage",
        component: () => import("@/views/GamesHistoryPage.vue")
    },
    {
        path: "/profile/statistics",
        name: "StatisticsPage",
        component: () => import("@/views/StatisticsPage.vue")
    }
]
