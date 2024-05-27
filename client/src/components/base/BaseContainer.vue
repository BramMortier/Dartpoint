<script setup>
// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    class: String,
    backgroundImage: String,
    backgroundImageDarkness: { type: Number, default: 0.4 },
    isClickable: { type: Boolean, default: true }
})
</script>

<template>
    <section
        class="base-container"
        :class="[props.class, { 'base-container--not-clickable': props.isClickable }]"
        :style="{
            backgroundImage: props.backgroundImage
                ? `linear-gradient(rgba(0, 0, 0, ${backgroundImageDarkness}),
                       rgba(0, 0, 0, ${backgroundImageDarkness})), url(${props.backgroundImage})`
                : 'none'
        }"
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

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @include styles-for(desktop) {
        padding: var(--space-24);
        gap: var(--space-32);
    }

    &--not-clickable {
        &:hover,
        &:focus {
            cursor: pointer;
            border-color: var(--clr-neutral-500);
        }
    }
}
</style>
