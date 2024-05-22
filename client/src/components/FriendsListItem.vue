<script setup>
// =============================================================================
// Imports
// =============================================================================

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    user: Object
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <li class="friends-list-item" :class="{ 'friends-list-item--offline': !user.isOnline }">
        <h3>{{ user.displayName }}</h3>

        <div class="friends-list-item__status">
            <div></div>

            <p>{{ user.isOnline ? "Online," : "Offline" }} {{ user.status }}</p>
        </div>
    </li>
</template>

<style scoped lang="scss">
.friends-list-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-500);
    border-radius: var(--border-radius-10);
    padding: var(--space-16);

    &--offline {
        opacity: 50%;

        .friends-list-item__status > div {
            background: var(--clr-neutral-500);
            border: none;
        }
    }

    &__status {
        display: flex;
        align-items: center;
        gap: var(--space-12);

        & > div {
            height: 1rem;
            width: 1rem;
            border-radius: var(--border-radius-round);
            background: var(--gradient-turqoise);
            border: 2px solid var(--clr-turqoise-500);
        }
    }
}
</style>
