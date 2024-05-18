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
    <div class="default-layout">
        <div class="default-layout__content">
            <header class="header">
                <BaseIcon class="header__logo" name="wordmark-horizontal-light" />
            </header>
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

<style scoped lang="scss">
.default-layout {
    display: grid;
    padding-block: var(--space-32);
    grid-template-columns: auto var(--space-32) minmax(0, 160rem) var(--space-32) auto;

    &__content {
        grid-column: 3 / 4;
        display: flex;
        flex-direction: column;
        gap: var(--space-32);
    }
}

.header {
    &__logo {
        max-width: 25rem;
    }
}
</style>
