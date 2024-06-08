<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameStatistics, GameDetectedDarts } from "@/components/index"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="game-freeplay">
        <div class="game-freeplay__top">
            <div class="game-freeplay__player-info">
                <h2>Bram Mortier</h2>

                <p class="typo-body-large">Dartshop Aalter</p>
            </div>

            <GameStatistics :number-of-stats="8" />
        </div>

        <GameDetectedDarts />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-freeplay {
    display: flex;
    flex-direction: column;
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
        }
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
