<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsListItem, FriendsDuplicateRequestModal } from "@/components/index"
import { friendRequestsApi } from "@/services/api"
import { useRouter } from "vue-router"
import { onMounted, ref, computed } from "vue"
import { timeSince } from "@/helpers"

import { useAuthStore } from "@/stores/authStore"
import { storeToRefs } from "pinia"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { authenticatedUser } = storeToRefs(useAuthStore())
const router = useRouter()

const requests = ref(null)

const outgoingRequests = computed(() => {
    return (
        requests.value &&
        requests.value.filter((request) => request.userId === authenticatedUser.value.id)
    )
})

const incommingRequests = computed(() => {
    return (
        requests.value &&
        requests.value.filter((request) => request.userId !== authenticatedUser.value.id)
    )
})

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
const acceptFriendRequest = async (requestSender) => {
    const requestBody = {
        isAccepted: true
    }

    const { status, message, body } = await friendRequestsApi.patchFriendRequest(
        requestSender,
        requestBody
    )

    router.go()
}

const cancelFriendRequest = async (requestReceiver) => {
    const { status, message, body } = await friendRequestsApi.deleteFriendRequest(requestReceiver)

    router.go()
}

const denyFriendRequest = async (requestSender) => {
    const { status, message, body } = await friendRequestsApi.deleteFriendRequest(requestSender)

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
                    v-for="item in outgoingRequests"
                    :name="item.friend.displayName"
                    :is-online="true"
                    :status="`Sent ${timeSince(new Date(item.createdAt))} ago`"
                    :show-profile-picture="true"
                    :show-status-indicator="false"
                >
                    <BaseButton
                        class="base-button--tertiary"
                        @click="cancelFriendRequest(item.friendId)"
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
                    v-for="item in incommingRequests"
                    :name="item.user.displayName"
                    :is-online="true"
                    status="Online, in game"
                    :show-profile-picture="true"
                >
                    <BaseButton
                        class="base-button--primary"
                        @click="denyFriendRequest(item.friendId)"
                    >
                        Deny
                    </BaseButton>

                    <BaseButton
                        class="base-button--secondary"
                        @click="acceptFriendRequest(request.userId)"
                    >
                        Accept
                    </BaseButton>
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
