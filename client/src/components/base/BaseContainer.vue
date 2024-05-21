<script setup>
// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    class: String
})
</script>

<template>
    <section class="base-container" :class="props.class">
        <slot></slot>
    </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.base-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding: var(--space-16);
    background-color: var(--clr-neutral-800);
    border: 1px solid var(--clr-neutral-600);
    border-radius: var(--border-radius-20);

    @include styles-for(desktop) {
        padding: var(--space-24);
        gap: var(--space-32);
    }
}
</style>
