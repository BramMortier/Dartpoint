<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { boardsApi } from "@/services/api/boardsApi"
import { useNotificationStore } from "@/stores/notificationStore"
import * as yup from "yup"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { addErrorNotification, addSuccesNotification } = useNotificationStore()

const addBoardFormValidationSchema = yup.object({
    code: yup.string().required("A board code is required")
})
// =============================================================================
// Functions
// =============================================================================
const addBoardFormSubmit = async (values) => {
    console.log(values)

    const requestBody = {
        boardCode: values.code
    }

    const { status, message, body } = await boardsApi.connect(requestBody)

    console.log(status, message, body)
}
</script>

<template>
    <div class="dartboards-connect">
        <BaseContainerTitle
            title="Add new board"
            explanation="You can connect to a new board by using the code from the sticker on the board"
        />

        <Form
            id="add-board-form"
            class="dartboards-connect__form"
            @submit="addBoardFormSubmit"
            :validation-schema="addBoardFormValidationSchema"
        >
            <BaseInput
                id="add-board-code"
                name="code"
                label="Board code"
                placeholder="Fill in a valid board code"
            />

            <BaseButton class="base-button--secondary">Add board</BaseButton>
        </Form>
    </div>
</template>

<style scoped lang="scss">
.dartboards-connect {
    display: flex;
    flex-direction: column;
    gap: var(--space-32);

    &__form {
        display: flex;
        flex-direction: column;
        gap: var(--space-32);
    }
}
</style>
