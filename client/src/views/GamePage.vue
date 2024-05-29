<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameFreeplay, GameCompetition, GamePlayerCard } from "@/components/index"
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
        ...data.dartInfo,
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
                <GamePlayerCard />
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
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-page {
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

    &__actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-32);
        grid-column: span 3;
    }

    &__session {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
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
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        & > .base-button {
            width: 100%;
        }
    }

    &__main {
        grid-column: span 9;
    }
}
</style>
