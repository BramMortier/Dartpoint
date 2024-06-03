<script setup>
// =============================================================================
// Imports
// =============================================================================

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    name: String,
    value: [String, Number]
})
// =============================================================================
// Composables, Refs & Computed
// =============================================================================

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <li class="game-statistics-item">
        <p>{{ props.name }}</p>
        <span>{{ props.value }}</span>
    </li>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-statistics-item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & > span {
        font-family: var(--font);
        font-size: var(--fs-32);
        font-weight: var(--fw-500);
        color: var(--clr-white);

        @include styles-for(desktop) {
            font-size: var(--fs-48);
        }
    }
}
</style>
