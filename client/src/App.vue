<script setup>
// =============================================================================
// Imports
// =============================================================================
import { RouterView } from "vue-router"
import { DefaultLayout } from "@/layouts/index"
import { pusher } from "@/services/pusher/index"
import { useSeoMeta } from "@unhead/vue"
import { computed } from "vue"

import { useRoute } from "vue-router"
import { useBoardStore } from "@/stores/boardStore"
import { useAuthStore } from "@/stores/authStore"
import { storeToRefs } from "pinia"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const route = useRoute()

const { authenticatedUser } = storeToRefs(useAuthStore())
const { connectedBoard } = storeToRefs(useBoardStore())

const title = computed(() => route.meta.title || "")
const description = computed(() => route.meta.description || "")
const layout = computed(() => route.meta.layout || DefaultLayout)

useSeoMeta({
    title: title,
    ogTitle: title,
    description: description,
    ogDescription: description
})

// =============================================================================
// Pusher event listeners
// =============================================================================
const friendRequestsChannel = pusher.subscribe(`friend-requests-${authenticatedUser.id}`)

friendRequestsChannel.bind("new-request", (data) => {
    console.log(data)
})

const boardChannel = pusher.subscribe(`board-${connectedBoard}`)

boardChannel.bind("detection", (data) => {
    console.log(data)
})
</script>

<template>
    <component :is="layout">
        <routerView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="route.path" />
            </transition>
        </routerView>
    </component>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
