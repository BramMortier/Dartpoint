<script setup>
// =============================================================================
// Imports
// =============================================================================
import { RouterView } from "vue-router"
import { pusher } from "@/services/pusher/index"
import { useSeoMeta } from "@unhead/vue"
import { useRoute } from "vue-router"
import { computed } from "vue"
import { DefaultLayout } from "@/layouts/index"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const route = useRoute()

const title = computed(() => route.meta.title || "")
const description = computed(() => route.meta.description || "")
const layout = computed(() => route.meta.layout || DefaultLayout)

useSeoMeta({
    title: title,
    ogTitle: title,
    description: description,
    ogDescription: description
})

const channel = pusher.subscribe("friend-requests")

channel.bind("test-event", (data) => {
    console.log(data)
})
</script>

<template>
    <component :is="layout">
        <RouterView />
    </component>
</template>

<style scoped lang="scss"></style>
