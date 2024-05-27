<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsListItem } from "@/components/index"
import { userApi } from "@/services/api"
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from "vue-router"
import { onMounted, ref, computed } from "vue"
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

const outgoingRequests = computed(() => {
    return (
        requests.value &&
        requests.value.filter((request) => request.userId === authenticatedUser.id)
    )
})

const incommingRequests = computed(() => {
    return (
        requests.value &&
        requests.value.filter((request) => request.userId !== authenticatedUser.id)
    )
})
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
const cancelFriendRequest = async (requestSender, requestReceiver) => {
    const { status, message, body } = await userApi.deleteFriendRequest(
        requestSender,
        requestReceiver
    )

    router.go()
}

const denyFriendRequest = async (requestSender, requestReceiver) => {
    const { status, message, body } = await userApi.deleteFriendRequest(
        requestReceiver,
        requestSender
    )

    router.go()
}
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
                    v-for="request in outgoingRequests"
                    :name="request.friend.displayName"
                    :is-online="true"
                    :status="`Sent ${timeSince(new Date(request.createdAt))} ago`"
                    :show-profile-picture="true"
                    :show-status-indicator="false"
                >
                    <BaseButton
                        class="base-button--tertiary"
                        @click="cancelFriendRequest(request.userId, request.friendId)"
                    >
                        Cancel request
                    </BaseButton>
                </FriendsListItem>
            </ul>
        </div>

        <div class="friends-requests-list__incomming-requests">
            <p class="typo-body-large">Incomming</p>

            <ul>
                <FriendsListItem
                    v-for="request in incommingRequests"
                    :name="request.friend.displayName"
                    :is-online="true"
                    status="Online, in game"
                    :show-profile-picture="true"
                >
                    <BaseButton
                        class="base-button--primary"
                        @click="denyFriendRequest(request.userId, request.friendId)"
                    >
                        Deny
                    </BaseButton>

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
    gap: var(--space-32);

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

        & > ul {
            display: flex;
            flex-direction: column;
            gap: var(--space-16);
        }
    }
}
</style>
