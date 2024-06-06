<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useRouter } from "vue-router"
import { FriendsListItem } from "@/components/index"
import { friendRequestsApi } from "@/services/api"
import { onMounted, ref } from "vue"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    showBackButton: { type: Boolean, default: true }
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const friends = ref(null)
const router = useRouter()

// =============================================================================
// Lifecycle hooks
// =============================================================================
onMounted(async () => {
    const { status, message, body } = await friendRequestsApi.getFriendRequests({
        isAccepted: true
    })

    console.log(body)

    friends.value = body.requests
})

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="friends-list">
        <BaseContainerTitle title="Your friends" :show-back-button="props.showBackButton" />

        <ul v-if="friends && friends.length > 0" class="friends-list__friends">
            <FriendsListItem
                v-for="item in friends"
                :show-profile-picture="true"
                :name="item.friend.displayName"
            >
                <BaseButton class="base-button--tertiary">Play</BaseButton>
            </FriendsListItem>
        </ul>

        <div v-else class="friends-list__empty">
            <h2>You don't have any friends</h2>

            <p class="typo-body-large">
                Add friends to view each others progress and stats or quickly start games.
            </p>

            <BaseButton
                class="base-button--tertiary"
                @click="router.push({ name: 'FriendsSendRequest' })"
            >
                Add friends
            </BaseButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.friends-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    height: 100%;

    &__friends {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
    }

    &__empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: var(--space-24);

        & > p {
            max-width: 25rem;
            text-align: center;
        }

        width: 100%;
        height: 100%;
    }
}
</style>
