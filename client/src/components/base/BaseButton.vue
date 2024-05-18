<script setup>
// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    class: String
})
</script>

<template>
    <button class="base-button" :class="props.class">
        <slot>Placeholder</slot>
    </button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.base-button {
    display: flex;
    align-items: center;
    gap: var(--space-16);

    height: 3.125rem;
    width: fit-content;
    padding-inline: var(--space-24);
    border-radius: var(--border-radius-15);
    background: var(--gradient-red);
    border: 2px solid var(--clr-red-500);
    outline: none;
    box-shadow: 0 0 0 0px var(--clr-neutral-700);

    font-family: var(--font);
    font-size: var(--fs-16);
    font-weight: var(--fw-500);
    color: var(--clr-white);

    transition: all ease-in 0.15s;

    &:hover,
    &:focus {
        cursor: pointer;
        box-shadow: 0 0 0 6px var(--clr-neutral-700);

        @include styles-for(desktop) {
            box-shadow: 0 0 0 8px var(--clr-neutral-700);
        }
    }

    @include styles-for(desktop) {
        height: 4rem;
        padding-inline: var(--space-32);
        border-radius: var(--border-radius-20);
        font-size: var(--fs-20);
    }

    &--secondary {
        background: var(--gradient-turqoise);
        border-color: var(--clr-turqoise-500);
    }
}
</style>
