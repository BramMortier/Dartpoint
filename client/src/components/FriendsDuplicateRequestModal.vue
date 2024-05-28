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
    requestSender: Object,
    isAccepted: Boolean
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
        <div class="friends-duplicate-request-modal__explanation">
            <div class="friends-duplicate-request-modal__title">
                <BaseIcon name="arrow-left" @click="closeModal" />

                <h2>Oopsie!</h2>
            </div>

            <p v-if="!props.isAccepted" class="typo-body-large">
                You already have a pending request from
                <span class="friends-duplicate-request-modal__request-sender">
                    {{ props.requestSender.displayName }}.
                </span>
                Do you want to accept it?
            </p>

            <p v-if="props.isAccepted" class="typo-body-large">
                You are already friends with
                <span class="friends-duplicate-request-modal__request-sender">
                    {{ props.requestSender.displayName }}.
                </span>
            </p>
        </div>

        <div class="friends-duplicate-request-modal__action-buttons">
            <BaseButton v-if="!props.isAccepted" @click="closeModal">Deny</BaseButton>

            <BaseButton
                v-if="!props.isAccepted"
                class="base-button--secondary"
                @click="acceptFriendRequest(requestSender.id)"
            >
                Accept
            </BaseButton>

            <BaseButton v-if="props.isAccepted" class="base-button--tertiary" @click="closeModal">
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
    max-width: 30rem;

    &__explanation {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
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

    &__request-sender {
        color: var(--clr-neutral-100);
    }

    &__action-buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-24);
    }
}
</style>
