<script setup>
// =============================================================================
// Imports
// =============================================================================
import { LogoIconSplit } from "@/components/icons/index"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="game-detected-darts">
        <div class="game-detected-darts__total">
            <LogoIconSplit :darts-thrown="2" />

            <span>43</span>
        </div>

        <div class="game-detected-darts__info">
            <div
                class="game-detected-darts__dart"
                :class="{ 'game-detected-darts__dart--missed': false }"
            >
                <span>5</span>

                <p>S5</p>
            </div>

            <div
                class="game-detected-darts__dart"
                :class="{ 'game-detected-darts__dart--missed': false }"
            >
                <span>38</span>

                <p>D19</p>
            </div>

            <div
                class="game-detected-darts__dart"
                :class="{ 'game-detected-darts__dart--missed': true }"
            >
                <p>MISS</p>
            </div>
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

    &__dart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--space-4);

        padding: var(--space-16) var(--space-32);
        border-radius: var(--border-radius-20);
        background-color: var(--clr-neutral-700);
        border: 1px solid var(--clr-neutral-500);

        @include styles-for(desktop) {
            gap: var(--space-8);
            padding: var(--space-24) var(--space-48);
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

            @include styles-for(desktop) {
                font-size: var(--fs-48);
            }
        }
    }
}
</style>
