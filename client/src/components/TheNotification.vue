<script setup>
// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    config: Object
})
</script>

<template>
    <li class="the-notification">
        <h3>{{ config.message }}</h3>

        <BaseIcon name="close" />
    </li>
</template>

<style scoped lang="scss">
.the-notification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-32);
    min-width: 31.25rem;

    padding: var(--space-16) var(--space-24);
    background: var(--gradient-turqoise);
    border: 1px solid var(--clr-turqoise-500);
    outline-offset: var(--space-4);
    border-radius: var(--border-radius-20);

    & > .base-icon {
        height: 1.5rem;
        width: auto;
        color: var(--clr-neutral-100);
        cursor: pointer;
    }
}
</style>
