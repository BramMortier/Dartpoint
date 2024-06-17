<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { useRouter } from "vue-router"
import { useGameStore } from "@/stores/gameStore"
import { storeToRefs } from "pinia"

import * as yup from "yup"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { gameSettings } = storeToRefs(useGameStore())

const startingScoreOptions = ["170", "301", "501", "701"]
const legsOptions = ["1 leg", "3 legs", "5 legs", "Custom"]

const configurationValidationSchema = yup.object({
    startingScore: yup.string(),
    legs: yup.string()
})

// =============================================================================
// Functions
// =============================================================================
const handleConfigurationFormSubmit = (values) => {
    gameSettings.value = {
        gameType: "Classic / X01",
        startingScore: values.startingScore,
        legs: values.legs
    }

    router.push({ name: "GamePage" })
}
</script>

<template>
    <div class="game-configuration">
        <h2>Speltype</h2>

        <h2>Classic / X01</h2>

        <p class="typo-body-large">
            The classic X01 dart game involves players starting with a score of 501 (standard) and
            aiming to reduce it to exactly zero, finishing with a double. Each turn, players throw
            three darts.
        </p>

        <Form
            id="game-settings-form"
            class="game-configuration__form"
            @submit="handleConfigurationFormSubmit"
            :validation-schema="configurationValidationSchema"
        >
            <div class="game-configuration__form-fields">
                <BaseOptions
                    id="game-settings-starting-score"
                    name="startingScore"
                    label="Starting score"
                    :options="startingScoreOptions"
                    :default-option="startingScoreOptions[1]"
                />

                <BaseOptions
                    id="game-settings-legs"
                    name="legs"
                    label="Race to"
                    :options="legsOptions"
                    :default-option="legsOptions[1]"
                />
            </div>

            <div class="game-configuration__action-buttons">
                <BaseButton type="button" @click="router.push({ name: 'DashboardPage' })">
                    Quit lobby
                </BaseButton>
                <BaseButton class="base-button--secondary">Start game</BaseButton>
            </div>
        </Form>
    </div>
</template>

<style scoped lang="scss">
.game-configuration {
    display: flex;
    flex-direction: column;
    gap: var(--space-32);
    height: 100%;

    &__form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--space-64);
        height: 100%;
    }

    &__form-fields {
        display: flex;
        flex-direction: column;
        gap: var(--space-24);
    }

    &__action-buttons {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: var(--space-24);
    }
}
</style>
