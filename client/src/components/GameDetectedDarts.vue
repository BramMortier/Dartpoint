<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameDetectedDart } from "@/components/index"
import { LogoIconSplit } from "@/components/icons/index"
import { useGameStore } from "@/stores/gameStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"

// =============================================================================
// Props & Events
// =============================================================================
const { currentTurn } = storeToRefs(useGameStore())

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const totalScore = computed(() => {
    if (currentTurn.value.length === 0) {
        return 0
    } else {
        return currentTurn.value.reduce((total, dart) => total + dart.dart_score, 0)
    }
})

const dartsThrown = computed(() => {
    if (currentTurn.value.length === 0) return 0

    return currentTurn.value.filter((dart) => dart.thrown).length
})

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="game-detected-darts">
        <div class="game-detected-darts__total">
            <LogoIconSplit :darts-thrown="dartsThrown" />

            <span>{{ totalScore }}</span>
        </div>

        <div class="game-detected-darts__info">
            <GameDetectedDart :detected-dart="currentTurn[0]" />
            <GameDetectedDart :detected-dart="currentTurn[1]" />
            <GameDetectedDart :detected-dart="currentTurn[2]" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-detected-darts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-24);
    padding-bottom: 0;

    @include styles-for(desktop) {
        gap: var(--space-48);
        padding-bottom: var(--space-32);
    }

    &__total {
        display: flex;
        align-items: center;
        gap: var(--space-24);

        @include styles-for(desktop) {
            gap: var(--space-48);
            font-size: var(--fs-64);
        }

        & > span {
            font-family: var(--font);
            font-weight: var(--fw-500);
            font-size: var(--fs-48);
            color: var(--clr-neutral-100);
            line-height: var(--lh-tight);

            @include styles-for(desktop) {
                font-size: var(--fs-64);
            }
        }

        & > .logo-icon-split {
            height: 48px;
            width: auto;

            @include styles-for(desktop) {
                height: 80px;
            }
        }
    }

    &__info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-16);

        @include styles-for(desktop) {
            gap: var(--space-24);
        }
    }
}
</style>
