<script setup>
// =============================================================================
// Imports
// =============================================================================
import {
    GameFreeplay,
    GameCompetition,
    GamePlayerCard,
    GamePlayerHistoryInfo
} from "@/components/index"

import { useGameStore } from "@/stores/gameStore"
import { useBoardStore } from "@/stores/boardStore"
import { useAuthStore } from "@/stores/authStore"
import { storeToRefs } from "pinia"
import { pusher } from "@/services/pusher"
import { onMounted, onUnmounted } from "vue"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { gameSettings, gameInfo } = storeToRefs(useGameStore())
const { authenticatedUser } = storeToRefs(useAuthStore())
const { connectedBoard } = storeToRefs(useBoardStore())

// =============================================================================
// Realtime pusher subscriptions
// =============================================================================
onMounted(async () => {
    const boardChannel = pusher.subscribe(`board-${connectedBoard.value}`)

    boardChannel.bind("detection", (data) => addThrow(data))
})

onUnmounted(async () => {
    pusher.unsubscribe(`board-${connectedBoard.value}`)
})

// =============================================================================
// Functions
// =============================================================================
const addThrow = (data) => {
    const dartData = {
        userId: authenticatedUser.value.id,
        ...data.detectedDartInfo,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    gameInfo.value.push(dartData)
}
</script>

<template>
    <div class="game-page">
        <div class="game-page__actions">
            <ul class="game-page__players">
                <GamePlayerCard
                    :in-free-play="gameSettings?.gameType === 'Freeplay' ? true : false"
                />
            </ul>

            <BaseContainer class="game-page__session" :is-clickable="false">
                <h3>Session</h3>

                <div class="game-page__session-actions">
                    <BaseButton class="base-button--tertiary">Add player</BaseButton>

                    <BaseButton>Quit game</BaseButton>
                </div>
            </BaseContainer>

            <BaseContainer class="game-page__presets" :is-clickable="false">
                <h3>Game presets</h3>

                <BaseButton class="base-button--tertiary">Custom preset</BaseButton>
            </BaseContainer>
        </div>

        <BaseContainer class="game-page__main" :is-clickable="false">
            <GameFreeplay v-if="gameSettings?.gameType === 'Freeplay'" />

            <GameCompetition v-else-if="gameSettings?.gameType === 'Classic / X01'" />
        </BaseContainer>

        <BaseContainer class="game-page__info" :is-clickable="false">
            <GamePlayerHistoryInfo />
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-page {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-16);

    @include styles-for(tablet) {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-24);
    }

    @include styles-for(desktop) {
        gap: var(--space-32);
        grid-template-columns: repeat(12, 1fr);
        height: 100%;
    }

    &__actions {
        display: flex;
        grid-column: span 1;
        grid-row: 2;
        flex-direction: column;
        gap: var(--space-16);

        @include styles-for(tablet) {
            gap: var(--space-24);
        }

        @include styles-for(desktop) {
            gap: var(--space-32);
            grid-row: 1;
            grid-column: span 3;
        }
    }

    &__session {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
        width: 100%;
    }

    &__session-actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        & > .base-button {
            width: 100%;
        }
    }

    &__presets {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        & > .base-button {
            width: 100%;
        }
    }

    &__players {
        display: none;

        @include styles-for(desktop) {
            display: flex;
        }
    }

    &__main {
        grid-column: span 1;

        @include styles-for(tablet) {
            grid-column: span 2;
        }

        @include styles-for(desktop) {
            grid-column: span 7;
        }
    }

    &__info {
        grid-column: span 1;
        min-height: 40vh;

        @include styles-for(desktop) {
            grid-column: span 2;
        }
    }
}
</style>
