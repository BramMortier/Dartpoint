<script setup>
// =============================================================================
// Imports
// =============================================================================
import {
    GameFreeplay,
    GameCompetition,
    GamePlayerCard,
    GamePlayerHistoryInfo,
    GameConfirmQuitModal
} from "@/components/index"

import { useGameStore } from "@/stores/gameStore"
import { useBoardStore } from "@/stores/boardStore"
import { useModalStore } from "@/stores/modalStore"
import { storeToRefs } from "pinia"
import { pusher } from "@/services/pusher"
import { onMounted, onUnmounted } from "vue"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { addThrow } = useGameStore()
const { openModal } = useModalStore()
const { gameSettings, players } = storeToRefs(useGameStore())
const { connectedBoard } = storeToRefs(useBoardStore())

// =============================================================================
// Realtime pusher subscriptions
// =============================================================================
onMounted(async () => {
    const boardChannel = pusher.subscribe(`board-${connectedBoard?.value.code}`)

    boardChannel.bind("detection", (data) => addThrow(data.detectedDartInfo))
})

onUnmounted(async () => {
    pusher.unsubscribe(`board-${connectedBoard?.value.code}`)
})

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="game-page">
        <div class="game-page__actions">
            <ul class="game-page__players">
                <GamePlayerCard
                    v-for="item in players"
                    :player="item"
                    :in-free-play="gameSettings?.gameType === 'Freeplay' ? true : false"
                />
            </ul>

            <BaseContainer class="game-page__session" :is-clickable="false">
                <h3>Session</h3>

                <div class="game-page__session-actions">
                    <BaseButton class="base-button--tertiary">Add player</BaseButton>

                    <BaseButton @click="openModal({ component: GameConfirmQuitModal })">
                        Quit game
                    </BaseButton>
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
            flex-direction: column;
            gap: var(--space-16);
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
