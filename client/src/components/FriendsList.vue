<script setup>
// =============================================================================
// Imports
// =============================================================================
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

        <ul class="friends-list__friends">
            <FriendsListItem
                v-for="item in friends"
                :show-profile-picture="true"
                :name="item.friend.displayName"
            >
                <BaseButton class="base-button--tertiary"> Play</BaseButton>
            </FriendsListItem>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.friends-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);

    &__friends {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
    }
}
</style>
