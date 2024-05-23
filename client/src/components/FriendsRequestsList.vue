<script setup>
// =============================================================================
// Imports
// =============================================================================
import { userApi } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from "vue-router"
import { onMounted, ref } from "vue"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { authenticatedUser } = useAuthStore()
const router = useRouter()

const requests = ref(null)

// =============================================================================
// Lifecycle hooks
// =============================================================================
onMounted(async () => {
    const { status, message, body } = await userApi.getFriendRequests(authenticatedUser.id)

    console.log(body)

    requests.value = body.requests
})
// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="friends-requests-list">
        <div>
            <BaseIcon name="arrow-left" @click="router.push({ name: 'FriendsList' })" />

            <h2>Recent friend requests</h2>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friends-requests-list {
    & > div {
        display: flex;
        align-items: center;
        gap: var(--space-24);
        color: var(--clr-neutral-100);

        & > .base-icon:hover {
            cursor: pointer;
        }
    }
}
</style>
