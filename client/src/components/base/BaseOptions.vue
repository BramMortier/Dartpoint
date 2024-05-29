<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useField } from "vee-validate"
import { onMounted } from "vue"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    id: String,
    name: { type: String, required: true },
    label: String,
    options: Array,
    defaultOption: String
})
// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { value, errorMessage } = useField(() => props.name)

// =============================================================================
// Lifecycle hooks
// =============================================================================
onMounted(() => (value.value = props.defaultOption))

// =============================================================================
// Functions
// =============================================================================
const changeOption = (option) => {
    value.value = option
}
</script>

<template>
    <div class="base-options">
        <label :for="props.id">{{ props.label }}</label>

        <input :id="props.id" v-model="value" :name="props.name" type="hidden" />

        <div class="base-options__options">
            <button
                v-for="item in props.options"
                type="button"
                class="base-options__option"
                :class="{ 'base-options__option--selected': value === item }"
                @click="changeOption(item)"
            >
                {{ item }}
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.base-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);

    & > input {
        display: none;
    }

    &__options {
        display: flex;
        flex-wrap: wrap;
        column-gap: var(--space-64);
        row-gap: var(--space-16);
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
