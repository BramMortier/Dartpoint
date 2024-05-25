<script setup>
// =============================================================================
// Imports
// =============================================================================

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
    <li class="game-player-card">
        <div class="game-player-card__main">
            <div class="game-player-card__player-info">
                <h4>Bram Mortier</h4>
                <p>DOBI45JD</p>
            </div>

            <span class="typo-h1">386</span>
        </div>
        <div class="game-player-card__progress-bar">
            <div class="game-player-card__progress-bar-value"></div>
        </div>
    </li>
</template>

<style scoped lang="scss">
.game-player-card {
    display: flex;
    flex-direction: column;

    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-500);
    border-radius: var(--border-radius-10);
    padding: var(--space-16);

    &__main {
        display: grid;
        row-gap: var(--space-16);
        grid-template-columns: repeat(2, 1fr);
    }

    &__player-info {
        grid-column: span 2;
    }

    &__progress-bar {
        display: flex;
        background-color: var(--clr-neutral-400);
        height: var(--space-8);
        width: 100%;
    }
}
</style>
