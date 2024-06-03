<script setup>
// =============================================================================
// Imports
// =============================================================================

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    inFreePlay: Boolean
})
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
            <div class="game-player-card__left">
                <div class="game-player-card__player-info">
                    <h4>Bram Mortier</h4>
                    <p>Dartshop Aalter</p>
                </div>

                <span v-if="!inFreePlay" class="typo-h1">386</span>
            </div>

            <div v-if="!inFreePlay" class="game-player-card__right">
                <div class="game-player-card__player-stats">
                    <p>AVG</p>
                    <h3>52,3</h3>
                </div>
            </div>
        </div>
        <div v-if="!inFreePlay" class="game-player-card__progress-bar">
            <div class="game-player-card__progress-bar-value"></div>
        </div>
    </li>
</template>

<style scoped lang="scss">
.game-player-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    width: 100%;

    background-color: var(--clr-neutral-800);
    border: 1px solid var(--clr-neutral-600);
    border-radius: var(--border-radius-20);
    padding: var(--space-16);

    &__main {
        display: flex;
        justify-content: space-between;
    }

    &__left {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
    }

    &__right {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    &__player-stats {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    &__progress-bar {
        display: flex;
        background-color: var(--clr-neutral-600);
        height: var(--space-12);
        width: 100%;
        border-radius: var(--border-radius-3);
    }

    &__progress-bar-value {
        height: 100%;
        width: 68%;
        border-radius: var(--border-radius-3);
        background-color: var(--clr-turqoise-500);
    }
}
</style>
