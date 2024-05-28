<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useRouter, RouterView } from "vue-router"
import { friendRequestsApi } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"
import { onMounted, ref } from "vue"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { authenticatedUser } = useAuthStore()

const requests = ref(null)

// =============================================================================
// Lifecycle hooks
// =============================================================================
onMounted(async () => {
    const { status, message, body } = await friendRequestsApi.getFriendRequests()
    requests.value = body.requests
})

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="friends-page">
        <BaseContainer class="friends-page__list" :is-clickable="false">
            <RouterView />
        </BaseContainer>

        <div class="friends-page__action-buttons">
            <BaseContainer
                class="friends-page__add-friends"
                @click="router.push({ name: 'FriendsSendRequest' })"
            >
                <h2>Add Friends</h2>
            </BaseContainer>

            <BaseContainer
                class="friends-page__friend-requests"
                @click="router.push({ name: 'FriendsRequestsList' })"
            >
                <p class="typo-body-large">New request(s)</p>

                <div>
                    <h2>Friend requests</h2>
                    <h2>{{ requests?.length }}</h2>
                </div>
            </BaseContainer>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.friends-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);

    @include styles-for(tablet) {
        gap: var(--space-24);
    }

    @include styles-for(desktop) {
        gap: var(--space-32);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        height: 100%;
    }

    &__list {
        grid-column: span 8;
        max-height: 800px;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        @include styles-for(desktop) {
            max-height: unset;
        }
    }

    &__action-buttons {
        grid-column: span 4;
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        @include styles-for(tablet) {
            flex-direction: row;
            gap: var(--space-24);
        }

        @include styles-for(desktop) {
            flex-direction: column;
            gap: var(--space-32);
        }
    }

    &__add-friends,
    &__friend-requests {
        justify-content: flex-end;
        width: 100%;
        height: 180px;

        @include styles-for(tablet) {
            height: 200px;
        }

        @include styles-for(desktop) {
            height: max(33vh, 300px);
        }
    }

    &__friend-requests {
        gap: var(--space-4);

        & > div {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
