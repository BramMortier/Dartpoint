<script setup>
import { computed } from "vue"

// =============================================================================
// Imports
// =============================================================================

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    detectedDart: Object
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const multiplierLetter = computed(() => {
    if (!props.detectedDart) return ""

    if (props.detectedDart?.dart_multiplier === 1) return "S"
    if (props.detectedDart?.dart_multiplier === 2) return "D"
    if (props.detectedDart?.dart_multiplier === 3) return "T"
})

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div
        class="game-detected-dart"
        :class="[
            { 'game-detected-dart--missed': false },
            { 'game-detected-dart--hit': props.detectedDart }
        ]"
    >
        <span>{{ props.detectedDart?.dart_score }}</span>

        <p>{{ multiplierLetter }}{{ props.detectedDart?.dart_zone }}</p>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-detected-dart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 33%;
    min-height: 140px;

    padding: var(--space-16) var(--space-16);
    border-radius: var(--border-radius-20);
    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-500);

    @include styles-for(tablet) {
        gap: var(--space-4);
        padding: var(--space-16) var(--space-32);
        min-width: 140px;
        min-height: 160px;
    }

    @include styles-for(desktop) {
        min-width: 13.75rem;
        min-height: 15rem;
        gap: var(--space-8);
        padding: var(--space-24) var(--space-48);
    }

    &--hit {
        background: var(--gradient-turqoise);
        border: 2px solid var(--clr-turqoise-500);
    }

    & > span {
        font-family: var(--font);
        font-weight: var(--fw-500);
        font-size: var(--fs-64);
        color: var(--clr-neutral-100);
        line-height: var(--lh-tight);

        @include styles-for(desktop) {
            font-size: var(--fs-96);
        }
    }

    & > p {
        font-size: var(--fs-32);
        font-weight: var(--fw-500);
        line-height: var(--lh-tight);
        color: var(--clr-neutral-100);

        @include styles-for(desktop) {
            font-size: var(--fs-48);
        }
    }
}
</style>
