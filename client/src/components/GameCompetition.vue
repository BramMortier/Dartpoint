<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameStatistics, GameDetectedDarts } from "@/components/index"
import { useGameStore } from "@/stores/gameStore"
import { useBoardStore } from "@/stores/boardStore"
import { storeToRefs } from "pinia"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { currentPlayer } = storeToRefs(useGameStore())
const { connectedBoard } = storeToRefs(useBoardStore())

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="game-competition">
        <div class="game-competition__top">
            <div class="game-competition__player-info">
                <h2>{{ currentPlayer.displayName }}</h2>

                <p class="typo-body-large">{{ connectedBoard?.name }}</p>
            </div>

            <GameStatistics variant="simple" />
        </div>

        <span class="game-competition__points-left typo-h1">501</span>

        <GameDetectedDarts />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-competition {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-32);
    height: 100%;

    @include styles-for(tablet) {
        gap: var(--space-64);
    }

    &__top {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-32);

        @include styles-for(tablet) {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;
        }
    }

    &__points-left {
        font-size: var(--fs-256);
    }

    &__player-info {
        display: flex;
        flex-direction: column;
        align-items: center;

        @include styles-for(desktop) {
            align-items: start;
        }
    }
}
</style>
