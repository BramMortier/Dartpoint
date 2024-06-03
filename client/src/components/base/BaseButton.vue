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
        <span class="typo-h4">
            <slot>Placeholder</slot>
        </span>

        <div class="base-button__loader"></div>
    </button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.base-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-16);

    height: 3.125rem;
    width: fit-content;
    padding-inline: var(--space-24);
    border-radius: var(--border-radius-15);
    background: var(--gradient-red);
    border: 2px solid var(--clr-red-500);
    outline: none;
    box-shadow: 0 0 0 0px var(--clr-neutral-700);

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
    }

    &--secondary {
        background: var(--gradient-turqoise);
        border-color: var(--clr-turqoise-500);
    }

    &--tertiary {
        background: var(--clr-black);
        border: 1px solid var(--clr-neutral-600);

        &:hover,
        &:focus {
            border-color: var(--clr-neutral-500);
            box-shadow: unset;
        }
    }

    &__loader {
        position: absolute;
        opacity: 0;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--border-radius-round);

        border: 3px solid transparent;
        border-top: 3px solid var(--clr-neutral-100);
        border-right: 3px solid var(--clr-neutral-100);
        border-left: 3px solid var(--clr-neutral-100);

        animation: spin 2s linear infinite;

        transition: all ease-in 0.15s;
    }

    &:disabled {
        pointer-events: none;
        opacity: 0.5;

        & > span {
            opacity: 0;
        }

        .base-button__loader {
            opacity: 1;
        }
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
