<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useField } from "vee-validate"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    name: { type: String, required: true },
    type: { type: String, default: "text" },
    label: String,
    placeholder: String
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { value, errorMessage } = useField(() => props.name)
</script>

<template>
    <div class="base-input">
        <div v-if="props.label" class="base-input__top">
            <label :for="props.name">{{ props.label }}</label>
        </div>
        <input
            class="base-input__field"
            :class="{ 'base-input__field--error': errorMessage }"
            v-model="value"
            :type="props.type"
            :name="props.name"
            :placeholder="props.placeholder"
            autocomplete="off"
        />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.base-input {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    width: 100%;

    @include styles-for(desktop) {
        gap: var(--space-8);
    }

    &__top {
        display: flex;
    }

    &__field {
        height: 3.125rem;
        width: 100%;
        border-radius: var(--border-radius-10);
        padding-inline: var(--space-16);
        background-color: var(--clr-black);
        border: 1px solid var(--clr-neutral-600);
        box-shadow: 0 0 0 0px var(--clr-neutral-700);
        outline: none;

        caret-color: var(--clr-neutral-100);
        font-family: var(--font);
        font-size: var(--fs-16);
        font-weight: var(--fw-500);
        color: var(--clr-neutral-100);

        transition: all ease-in 0.15s;

        @include styles-for(desktop) {
            font-size: var(--fs-18);
            padding-inline: var(--space-24);
            height: 4rem;
            max-width: 50rem;
        }

        &:hover,
        &:focus {
            box-shadow: 0 0 0 4px var(--clr-neutral-700);
            border-color: var(--clr-neutral-500);

            @include styles-for(desktop) {
                box-shadow: 0 0 0 6px var(--clr-neutral-700);
            }
        }

        &::placeholder {
            font-family: var(--font);
            font-size: var(--fs-16);
            font-weight: var(--fw-500);
            color: var(--clr-neutral-400);

            @include styles-for(desktop) {
                font-size: var(--fs-18);
            }
        }

        &--error {
            box-shadow: 0 0 0 4px var(--clr-error-glow);
            border-color: var(--clr-error-border);

            @include styles-for(desktop) {
                box-shadow: 0 0 0 6px var(--clr-error-glow);
            }

            &:hover,
            &:focus {
                box-shadow: 0 0 0 4px var(--clr-error-glow);
                border-color: var(--clr-error-border);

                @include styles-for(desktop) {
                    box-shadow: 0 0 0 6px var(--clr-error-glow);
                }
            }
        }
    }
}
</style>
