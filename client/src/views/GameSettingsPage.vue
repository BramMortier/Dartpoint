<script setup>
// =============================================================================
// Imports
// =============================================================================
import { Form } from "vee-validate"
import { FriendsListItem } from "@/components/index"
import { onMounted } from "vue"
import * as yup from "yup"

import { useRouter, useRoute } from "vue-router"
import { useGameStore } from "@/stores/gameStore"
import { useAuthStore } from "@/stores/authStore"
import { storeToRefs } from "pinia"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const route = useRoute()
const router = useRouter()

const { authenticatedUser } = storeToRefs(useAuthStore())

const { gameSettings, players } = storeToRefs(useGameStore())
const { resetGame } = useGameStore()

const startingScoreOptions = ["170", "301", "501", "701"]
const legsOptions = ["1 leg", "3 legs", "5 legs", "Custom"]

const configurationValidationSchema = yup.object({
    startingScore: yup.string(),
    legs: yup.string()
})

// =============================================================================
// Lifecycle hooks
// =============================================================================
onMounted(() => {
    resetGame()
    players.value = [...players.value, authenticatedUser.value]
})

// =============================================================================
// Functions
// =============================================================================
const handleConfigurationFormSubmit = (values) => {
    console.log(values)

    gameSettings.value = {
        gameType: "Classic / X01",
        startingScore: values.startingScore,
        legs: values.legs
    }

    router.push({ name: "GamePage" })
}
</script>

<template>
    <div class="game-settings-page">
        <div class="game-settings-page__lobby-info">
            <BaseContainer class="game-settings-page__lobby-players" :is-clickable="false">
                <div>
                    <BaseIcon name="arrow-left" @click="router.back()" />

                    <h2>Lobby</h2>
                </div>

                <p class="typo-body-large">{{ players.length }} Players</p>

                <ul class="game-settings-page__lobby-players-list">
                    <FriendsListItem
                        v-for="item in players"
                        :show-profile-picture="true"
                        :is-online="true"
                        :name="item.displayName"
                        status="Online, Ready"
                        connected-board="Dartshop Aalter"
                    />

                    <div class="game-settings-page__lobby-add-player">
                        <BaseButton class="base-button--tertiary"> Add player </BaseButton>
                    </div>
                </ul>
            </BaseContainer>

            <BaseContainer class="game-settings-page__lobby-code" :is-clickable="false">
                <p class="typo-body-large">Game code</p>

                <div class="game-settings-page__lobby-code-string">
                    <span class="typo-h1">{{ route.params.id }}</span>

                    <BaseIcon name="copy-to-clipboard" />
                </div>
            </BaseContainer>
        </div>

        <BaseContainer class="game-settings-page__configuration" :is-clickable="false">
            <h2>Speltype</h2>

            <h2>Classic / X01</h2>

            <p class="typo-body-large">
                The classic X01 dart game involves players starting with a score of 501 (standard)
                and aiming to reduce it to exactly zero, finishing with a double. Each turn, players
                throw three darts.
            </p>

            <Form
                id="game-settings-form"
                class="game-settings-page__configuration-form"
                @submit="handleConfigurationFormSubmit"
                :validation-schema="configurationValidationSchema"
            >
                <div class="game-settings-page__configuration-form-fields">
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

                <div class="game-settings-page__configuration-action-buttons">
                    <BaseButton type="button" @click="router.push({ name: 'DashboardPage' })">
                        Quit lobby
                    </BaseButton>
                    <BaseButton class="base-button--secondary">Start game</BaseButton>
                </div>
            </Form>
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-settings-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);

    @include styles-for(tablet) {
        gap: var(--space-24);
    }

    @include styles-for(desktop) {
        gap: var(--space-32);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        height: 100%;
    }

    &__lobby-info {
        grid-column: span 4;
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        @include styles-for(tablet) {
            gap: var(--space-24);
        }

        @include styles-for(desktop) {
            gap: var(--space-32);
        }
    }

    &__lobby-players {
        min-height: 25rem;
        gap: var(--space-16);

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

    &__lobby-players-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
    }

    &__lobby-add-player {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;

        background-color: var(--clr-neutral-700);
        border: 1px solid var(--clr-neutral-500);
        border-radius: var(--border-radius-10);
    }

    &__lobby-code {
        gap: var(--space-4);
    }

    &__lobby-code-string {
        display: flex;
        gap: var(--space-16);

        &:hover {
            cursor: pointer;
        }

        & > span {
            font-size: var(--fs-32);

            @include styles-for(desktop) {
                font-size: var(--fs-48);
            }
        }

        & > .base-icon {
            height: 1.5rem;
            width: auto;
            color: var(--clr-neutral-100);

            @include styles-for(desktop) {
                height: 1.75rem;
            }
        }
    }

    &__configuration {
        grid-column: span 8;
    }

    &__configuration-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--space-64);
        height: 100%;
    }

    &__configuration-form-fields {
        display: flex;
        flex-direction: column;
        gap: var(--space-24);
    }

    &__configuration-action-buttons {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: var(--space-24);
    }
}
</style>
