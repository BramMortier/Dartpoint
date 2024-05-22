<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { useRouter } from "vue-router"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="friends-send-request">
        <div class="friends-send-request__explanation">
            <div>
                <BaseIcon name="arrow-left" @click="router.push({ name: 'FriendsList' })" />

                <h2>Add new friends</h2>
            </div>

            <p>You can add new friends using their mystery unique proprety for now</p>
        </div>

        <Form class="friends-send-request__form">
            <BaseInput
                id="send-request-friend-code"
                name="friend-code"
                label="Friend code"
                placeholder="Type a friend code to send a friend request"
            />

            <BaseButton>Send request</BaseButton>
        </Form>
    </div>
</template>

<style scoped lang="scss">
.friends-send-request {
    display: flex;
    flex-direction: column;
    gap: var(--space-32);

    &__explanation {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);

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

    &__form {
        display: flex;
        flex-direction: column;
        gap: var(--space-32);
    }
}
</style>
