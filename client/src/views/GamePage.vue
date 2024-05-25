<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameFreeplay, GameCompetition, GamePlayerCard } from "@/components/index"
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
    <div class="game-page">
        <div class="game-page__actions">
            <ul class="game-page__players">
                <GamePlayerCard />
            </ul>

            <BaseContainer class="game-page__session" :is-clickable="false">
                <h2>Session</h2>

                <div class="game-page__session-actions">
                    <BaseButton class="base-button--tertiary">Add player</BaseButton>

                    <BaseButton>Quit game</BaseButton>
                </div>
            </BaseContainer>

            <BaseContainer class="game-page__presets" :is-clickable="false">
                <h2>Game presets</h2>

                <BaseButton class="base-button--tertiary">Custom preset</BaseButton>
            </BaseContainer>
        </div>

        <BaseContainer class="game-page__main" :is-clickable="false">
            <GameFreeplay />

            <GameCompetition />
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);

    @include styles-for(tablet) {
        gap: var(--space-24);
    }

    @include styles-for(desktop) {
        gap: var(--space-32);
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        height: 100%;
    }

    &__actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-32);
        grid-column: span 3;
    }

    &__session {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
    }

    &__session-actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        & > .base-button {
            width: 100%;
        }
    }

    &__presets {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        & > .base-button {
            width: 100%;
        }
    }

    &__main {
        grid-column: span 9;
    }
}
</style>
