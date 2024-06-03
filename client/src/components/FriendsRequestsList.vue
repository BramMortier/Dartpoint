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

    console.log(body.requests)

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

    console.log(message, body, status)

    router.go()
}

const cancelFriendRequest = async (requestReceiver) => {
    const { status, message, body } = await friendRequestsApi.deleteFriendRequest(requestReceiver)

    console.log(message, body, status)

    router.go()
}

const denyFriendRequest = async (requestSender) => {
    const { status, message, body } = await friendRequestsApi.deleteFriendRequest(requestSender)

    console.log(message, body, status)
}
</script>

<template>
    <div class="friends-requests-list">
        <BaseContainerTitle title="Recent friend requests" />

        <div
            v-if="outgoingRequests && outgoingRequests.length > 0"
            class="friends-requests-list__outgoing-requests"
        >
            <p class="typo-body-large">{{ outgoingRequests.length }} Outgoing</p>

            <ul>
                <FriendsListItem
                    v-for="item in outgoingRequests"
                    :name="item.friend.displayName"
                    :show-country="false"
                    :info="`Sent ${timeSince(new Date(item.createdAt))} ago`"
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

        <div
            v-if="incommingRequests && incommingRequests.length > 0"
            class="friends-requests-list__incomming-requests"
        >
            <p class="typo-body-large">{{ incommingRequests.length }} Incomming</p>

            <ul>
                <FriendsListItem v-for="item in incommingRequests" :name="item.user.displayName">
                    <BaseButton
                        class="base-button--primary"
                        @click="denyFriendRequest(item.friendId)"
                    >
                        Deny
                    </BaseButton>

                    <BaseButton
                        class="base-button--secondary"
                        @click="acceptFriendRequest(item.userId)"
                    >
                        Accept
                    </BaseButton>
                </FriendsListItem>
            </ul>
        </div>

        <div v-else class="friends-requests-list__empty">
            <h2>Empty</h2>

            <p class="typo-body-large">You currently have no new requests to process</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.friends-requests-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    height: 100%;

    @include styles-for(desktop) {
        gap: var(--space-32);
    }

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

    &__empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-block: var(--space-64);
        gap: var(--space-8);

        @include styles-for(desktop) {
            gap: var(--space-24);
        }

        & > p {
            max-width: 25rem;
            text-align: center;
        }

        width: 100%;
        height: 100%;
    }
}
</style>
