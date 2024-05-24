<script setup>
// =============================================================================
// Imports
// =============================================================================

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    id: String,
    name: { type: String, required: true },
    options: Array,
    defaultOption: String
})
// =============================================================================
// Composables, Refs & Computed
// =============================================================================

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="base-option-buttons">
        <BaseInput :id="props.id" :name="props.name" type="hidden" />

        <button
            v-for="option in props.options"
            class="base-option-buttons__option"
            :class="{ 'base-option-buttons__option--selected': props.defaultOption === option }"
        >
            {{ option }}
        </button>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.base-option-buttons {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-64);
    row-gap: var(--space-16);

    & > .base-input {
        display: none;
    }

    &__option {
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--clr-neutral-400);

        font-family: var(--font);
        font-size: var(--fs-32);
        font-weight: var(--fw-500);

        transition: all ease-in 0.15s;

        @include styles-for(desktop) {
            font-size: var(--fs-48);
        }

        &:hover {
            color: var(--clr-neutral-100);
            cursor: pointer;
        }

        &--selected {
            color: var(--clr-neutral-100);
        }
    }
}
</style>
