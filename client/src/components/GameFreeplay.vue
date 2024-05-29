<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameStatistics } from "@/components/index"

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

            <GameStatistics />
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-freeplay {
    &__top {
        display: flex;
        justify-content: space-between;
    }
}
</style>
