<script setup>
// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    class: String,
    isClickable: { type: Boolean, default: true }
})
</script>

<template>
    <section
        class="base-container"
        :class="[props.class, { 'base-container--clickable': props.isClickable }]"
    >
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
    transition: all ease-in 0.15s;

    @include styles-for(desktop) {
        padding: var(--space-24);
        gap: var(--space-32);
    }

    &--clickable {
        &:hover,
        &:focus {
            cursor: pointer;
            border-color: var(--clr-neutral-500);
        }
    }
}
</style>
