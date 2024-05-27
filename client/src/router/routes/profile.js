export const profileRoutes = [
    {
        path: "/profile",
        name: "ProfilePage",
        component: () => import("@/views/ProfilePage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | Profile",
            description: "Your pofile info & statistics"
        }
    },
    {
        path: "/profile/challanges",
        name: "ChallangesPage",
        component: () => import("@/views/ChallangesPage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | Challanges",
            description: "Challanges completion overview"
        }
    },
    {
        path: "/profile/friends",
        component: () => import("@/views/FriendsPage.vue"),
        children: [
            {
                path: "",
                name: "FriendsPage",
                component: () => import("@/components/FriendsList.vue"),
                meta: {
                    protected: true,
                    title: "Dartpoint | Friends",
                    description: "List of all your friends"
                }
            },
            {
                path: "send-request",
                name: "FriendsSendRequest",
                component: () => import("@/components/FriendsSendRequest.vue"),
                meta: {
                    protected: true,
                    title: "Dartpoint | Add friends",
                    description: "Add new friends using their friend code"
                }
            },
            {
                path: "requests",
                name: "FriendsRequestsList",
                component: () => import("@/components/FriendsRequestsList.vue"),
                meta: {
                    protected: true,
                    title: "Dartpoint | Friend requests",
                    description: "Overview of your friend requests"
                }
            }
        ]
    },
    {
        path: "/profile/games",
        name: "GamesHistoryPage",
        component: () => import("@/views/GamesHistoryPage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | Games history",
            description: "Overview of al past game results"
        }
    },
    {
        path: "/profile/statistics",
        name: "StatisticsPage",
        component: () => import("@/views/StatisticsPage.vue"),
        meta: {
            protected: true,
            title: "Dartpoint | Statistics",
            description: "In depth statistics of your performance"
        }
    }
]
