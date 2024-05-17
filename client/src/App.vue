<script setup>
// =============================================================================
// Imports
// =============================================================================
import PlaygroundPage from "@/views/PlaygroundPage.vue"
import { useQuery } from "@tanstack/vue-query"
import { getUsers } from "@/services/userApi"
</script>

<template>
    <div class="app">
        <ul>
            <li v-for="user in data.body">{{ user.displayName }}</li>
        </ul>
        <PlaygroundPage />
        <VueQueryDevtools />
    </div>
</template>

<style scoped lang="scss">
.app {
}
</style>
