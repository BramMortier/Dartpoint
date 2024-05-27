<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsListItem } from "@/components/index"
import { userApi } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from "vue-router"
import { onMounted, ref } from "vue"
import { timeSince } from "@/helpers"

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
        <div class="friends-requests-list__title">
            <BaseIcon name="arrow-left" @click="router.back()" />

            <h2>Recent friend requests</h2>
        </div>

        <div class="friends-requests-list__outgoing-requests">
            <p class="typo-body-large">Outgoing</p>

            <ul>
                <FriendsListItem
                    v-for="request in requests"
                    :name="request.friend.displayName"
                    :is-online="true"
                    :status="`Sent ${timeSince(new Date(request.createdAt))} ago`"
                    :show-profile-picture="true"
                    :show-status-indicator="false"
                >
                    <BaseButton class="base-button--tertiary"> Cancel request </BaseButton>
                </FriendsListItem>
            </ul>
        </div>

        <div class="friends-requests-list__incomming-requests">
            <p class="typo-body-large">Incomming</p>

            <ul>
                <FriendsListItem
                    v-for="request in requests"
                    :name="request.friend.displayName"
                    :is-online="true"
                    status="Online, in game"
                    :show-profile-picture="true"
                >
                    <BaseButton class="base-button--primary"> Deny </BaseButton>

                    <BaseButton class="base-button--secondary"> Accept </BaseButton>
                </FriendsListItem>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friends-requests-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);

    &__title {
        display: flex;
        align-items: center;
        gap: var(--space-24);
        color: var(--clr-neutral-100);

        & > .base-icon:hover {
            cursor: pointer;
        }
    }

    &__outgoing-requests,
    &__incomming-requests {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
    }
}
</style>
