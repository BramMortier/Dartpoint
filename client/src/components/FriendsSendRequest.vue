<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { useRouter } from "vue-router"
import { useModalStore } from "@/stores/modalStore"
import { useNotificationStore } from "@/stores/notificationStore"
import { friendRequestsApi } from "@/services/api"
import { FriendsDuplicateRequestModal } from "@/components/index"
import * as yup from "yup"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { openModal } = useModalStore()
const { addNotification } = useNotificationStore()

const sendFriendRequestFormValidationSchema = yup.object({
    id: yup.string().required("Invalid friend code!")
})

// =============================================================================
// Functions
// =============================================================================
const SendFriendRequestFormSubmit = async (values, { resetForm }) => {
    const requestBody = {
        isAccepted: false,
        friendId: values.id
    }

    const { status, message, body, error } =
        await friendRequestsApi.createFriendRequest(requestBody)

    console.log(status, message, body, error)

    if (status === 409 && !error.isAccepted)
        openModal({
            component: FriendsDuplicateRequestModal,
            props: { requestSender: error.requestSender, isAccepted: false }
        })

    if (error.isAccepted)
        openModal({
            component: FriendsDuplicateRequestModal,
            props: { requestSender: error.requestSender, isAccepted: true }
        })

    resetForm()
}

const sendNotification = () => {
    addNotification({
        title: "Succes!",
        message: "Deleted location succesfully",
        type: "succes",
        removeDelay: 2000
    })
}
</script>

<template>
    <div class="friends-send-request">
        <div class="friends-send-request__explanation">
            <div class="friends-send-request__title">
                <BaseIcon name="arrow-left" @click="router.back()" />

                <h2>Add new friends</h2>
            </div>

            <p class="typo-body-large">You can add new friends using their dartpointID</p>
        </div>

        <Form
            @submit="SendFriendRequestFormSubmit"
            :validation-schema="sendFriendRequestFormValidationSchema"
            id="send-friend-request-form"
            class="friends-send-request__form"
        >
            <BaseInput
                id="send-friend-request-id"
                type="text"
                name="id"
                label="Dartpoint ID"
                placeholder="Type a friend's dartpointID to send a request"
            />

            <BaseButton class="base-button--secondary">Send request</BaseButton>
        </Form>
        <BaseButton @click="sendNotification">Send notification</BaseButton>
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

    &__form {
        display: flex;
        flex-direction: column;
        gap: var(--space-32);
    }
}
</style>
