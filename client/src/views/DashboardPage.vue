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
    <div class="dashboard-page">
        <div class="dashboard-page__action-buttons">
            <BaseContainer class="dashboard-page__start-game"></BaseContainer>
            <BaseContainer class="dashboard-page__profile"></BaseContainer>
            <BaseContainer class="dashboard-page__dartboards"></BaseContainer>
        </div>

        <BaseContainer class="dashboard-page__friends-list"></BaseContainer>
    </div>
</template>

<style scoped lang="scss">
.dashboard-page {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-32);
    height: 100%;

    &__action-buttons {
        grid-column: span 8;
        height: 100%;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr 25vh;
        gap: var(--space-32);
    }

    &__start-game {
        grid-column: span 2;
    }

    &__friends-list {
        grid-column: span 4;
        height: 100%;
    }
}
</style>
