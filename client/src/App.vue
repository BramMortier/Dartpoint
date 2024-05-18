<script setup>
// =============================================================================
// Imports
// =============================================================================
import { RouterView } from "vue-router"
import { pusher } from "@/services/pusher/index"

const channel = pusher.subscribe("test-channel")

channel.bind("test-event", (data) => {
    console.log(data)
})
</script>

<template>
    <div class="app">
        <RouterView />
    </div>
</template>

<style scoped lang="scss"></style>
