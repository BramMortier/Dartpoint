<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/authStore"
import { userApi } from "@/services/api"
import * as yup from "yup"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { authenticatedUser } = useAuthStore()

const friendRequestFormValidationSchema = yup.object({
    code: yup.string().required("Invalid friend code!")
})

// =============================================================================
// Functions
// =============================================================================
const handleFriendRequestFormSubmit = async (values) => {
    const requestBody = {
        isAccepted: false,
        userId: authenticatedUser.id,
        friendId: values.code
    }

    console.log(requestBody)

    const { status, message, body } = await userApi.createFriendRequest(requestBody)

    console.log(status, message, body)
}
</script>

<template>
    <div class="friends-send-request">
        <div class="friends-send-request__explanation">
            <div>
                <BaseIcon name="arrow-left" @click="router.back()" />

                <h2>Add new friends</h2>
            </div>

            <p>You can add new friends using their mystery unique proprety for now</p>
        </div>

        <Form
            @submit="handleFriendRequestFormSubmit"
            :validation-schema="friendRequestFormValidationSchema"
            id="friend-request-form"
            class="friends-send-request__form"
        >
            <BaseInput
                id="friend-request-form-code"
                type="number"
                name="code"
                label="Friend code"
                placeholder="Type a friend code to send a friend request"
            />

            <BaseButton class="base-button--secondary">Send request</BaseButton>
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
