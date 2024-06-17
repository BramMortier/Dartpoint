<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { useGameStore } from "@/stores/gameStore"
import { useNotificationStore } from "@/stores/notificationStore"
import { useRouter } from "vue-router"

import * as yup from "yup"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { addPlayer } = useGameStore()
const { addSuccesNotification } = useNotificationStore()

const addGuestFormValidationSchema = yup.object({
    guestName: yup.string()
})

// =============================================================================
// Functions
// =============================================================================
const addGuestFormSubmit = (values) => {
    console.log(values)

    addPlayer({
        id: Math.floor(Math.random() * 50),
        displayName: `${values.guestName} (guest)`,
        isGuest: true
    })

    addSuccesNotification({ message: `Added ${values.guestName} as a guest` })

    router.push({ name: "GameSettingsPage" })
}
</script>

<template>
    <div class="game-add-guest">
        <BaseContainerTitle
            title="Add a guest"
            explanation="Gastspelers zijn tijdelijk. Hun profiel wordt dus niet bewaard! Maak een Dartpoint account aan als je van alle features wilt kunnen genieten."
        />

        <Form
            id="add-guest-form"
            class="game-add-guest__form"
            @submit="addGuestFormSubmit"
            :validation-schema="addGuestFormValidationSchema"
        >
            <div class="game-add-guest__form-fields">
                <BaseInput
                    id="add-guest-name"
                    name="guestName"
                    label="Guest name"
                    placeholder="Choose a name for the guest player"
                />
            </div>

            <BaseButton class="base-button--secondary">Add Guest</BaseButton>
        </Form>
    </div>
</template>

<style scoped lang="scss">
.game-add-guest {
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
