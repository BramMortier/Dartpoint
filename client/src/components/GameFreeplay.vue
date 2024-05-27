<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameStatisticsItem } from "@/components/index"
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

            <ul class="game-freeplay__stats">
                <GameStatisticsItem name="Average" value="56,7" />
                <GameStatisticsItem name="9 Dart average" value="64,2" />
                <GameStatisticsItem name="Total points" value="2987" />
                <GameStatisticsItem name="Darts thrown" value="147" />

                <GameStatisticsItem name="100+" value="12" />
                <GameStatisticsItem name="140+" value="4" />
                <GameStatisticsItem name="Highest score" value="160" />
                <GameStatisticsItem name="T20 Percentage" value="12,5%" />
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-freeplay {
    &__top {
        display: flex;
        justify-content: space-between;
    }

    &__stats {
        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: var(--space-32) var(--space-96);
    }
}
</style>
