<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useRouter } from "vue-router"
import { useGameStore } from "@/stores/gameStore"
import { useAuthStore } from "@/stores/authStore"
import { storeToRefs } from "pinia"

import cryptoRandomString from "crypto-random-string"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
const { resetGame, addPlayer } = useGameStore()
const { authenticatedUser } = storeToRefs(useAuthStore())

// =============================================================================
// Functions
// =============================================================================
const createGame = () => {
    resetGame()

    addPlayer(authenticatedUser.value)

    router.push({
        name: "GameSettingsPage",
        params: { id: cryptoRandomString({ length: 8, type: "distinguishable" }) }
    })
}
</script>

<template>
    <div class="game-start-options">
        <div class="game-start-options__create-game" @click.stop="createGame">
            <BaseIcon class="game-start-options__deco" name="logo-icon" />

            <div>
                <h3>Create a game</h3>

                <BaseIcon name="arrow-right" />
            </div>
        </div>

        <div class="game-start-options__enter-code">
            <BaseIcon class="game-start-options__deco" name="logo-icon" />

            <div>
                <h3>Enter game code</h3>

                <BaseIcon name="arrow-right" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-start-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);

    @include styles-for(tablet) {
        flex-direction: row;
        gap: var(--space-24);
    }

    &__deco {
        position: absolute;
        bottom: -1rem;
        left: 1rem;
        height: 140px;
        width: auto;

        @include styles-for(tablet) {
            height: 160px;
        }

        @include styles-for(desktop) {
            height: 180px;
        }
    }

    &__create-game,
    &__enter-code {
        position: relative;
        border-radius: var(--border-radius-20);
        padding: var(--space-16);
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        height: 140px;
        width: 100%;

        @include styles-for(large-phone) {
            width: 260px;
        }

        @include styles-for(tablet) {
            height: 180px;
            width: 300px;
        }

        @include styles-for(desktop) {
            height: 220px;
            width: 340px;
        }

        & > div {
            color: var(--clr-neutral-100);
            display: flex;
            align-items: center;
            gap: var(--space-16);
            z-index: 1;

            & > .base-icon {
                height: 1.25rem;
                width: auto;
            }
        }
    }

    &__create-game {
        background: var(--gradient-turqoise);
        border: 2px solid var(--clr-turqoise-500);
        color: var(--clr-turqoise-500);
    }

    &__enter-code {
        background: var(--gradient-red);
        border: 2px solid var(--clr-red-500);
        color: var(--clr-red-500);
    }
}
</style>
