<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useModalStore } from "@/stores/modalStore"
import { friendRequestsApi } from "@/services/api"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    type: String,
    request: Object
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { closeModal } = useModalStore()

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

    console.log(status, message, body)

    closeModal()
}
</script>

<template>
    <div class="friends-duplicate-request-modal">
        <h2>Duplicate request</h2>

        <p v-if="props.type === 'outgoing'" class="typo-body-large">
            <span v-if="props.request.isAccepted !== true">You already sent a request to</span>

            <span v-else>You are already friends with</span>

            <span>{{ props.request.friend.displayName }}</span>
        </p>

        <p v-if="props.type === 'incomming'" class="typo-body-large">
            <span v-if="props.request.isAccepted !== true">
                You already have a pending request from
            </span>

            <span v-else>You are already friends with</span>

            <span>{{ props.request.user.displayName }}</span>
        </p>

        <div class="friends-duplicate-request-modal__action-buttons">
            <BaseButton
                v-if="props.type === 'incomming' && props.request.isAccepted === false"
                @click="closeModal"
            >
                Deny
            </BaseButton>

            <BaseButton
                v-if="props.type === 'incomming' && props.request.isAccepted === false"
                class="base-button--secondary"
                @click="acceptFriendRequest(requestSender.id)"
            >
                Accept
            </BaseButton>

            <BaseButton
                v-if="props.request.isAccepted || props.type === 'outgoing'"
                class="base-button--tertiary"
                @click="closeModal"
            >
                Close
            </BaseButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friends-duplicate-request-modal {
    display: flex;
    flex-direction: column;
    gap: var(--space-32);
    max-width: 31.25rem;

    & > p {
        display: flex;
        align-items: center;
        gap: var(--space-12);

        & > span:last-child {
            color: var(--clr-neutral-100);
            font-weight: var(--fw-500);
        }
    }

    &__action-buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-24);
    }
}
</style>
