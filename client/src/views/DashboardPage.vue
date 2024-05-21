<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsList } from "@/components/index"

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
    <div class="dashboard-page">
        <div class="dashboard-page__action-buttons">
            <BaseContainer class="dashboard-page__start-game">
                <div class="dashboard-page__start-game-options">
                    <div class="dashboard-page__create-game">
                        <BaseIcon
                            class="dashboard-page__start-game-options-deco"
                            name="logo-icon"
                        />

                        <div>
                            <h3>Create a game</h3>

                            <BaseIcon name="arrow-right" />
                        </div>
                    </div>

                    <div class="dashboard-page__enter-game-code">
                        <BaseIcon
                            class="dashboard-page__start-game-options-deco"
                            name="logo-icon"
                        />

                        <div>
                            <h3>Enter game code</h3>

                            <BaseIcon name="arrow-right" />
                        </div>
                    </div>
                </div>

                <h1>
                    Start a game <br />
                    or throw a dart
                </h1>
            </BaseContainer>

            <BaseContainer class="dashboard-page__profile">
                <h2>Profile & statistics</h2>
            </BaseContainer>

            <BaseContainer class="dashboard-page__dartboards">
                <h2>My dartboards</h2>
            </BaseContainer>
        </div>

        <BaseContainer class="dashboard-page__friends-list">
            <FriendsList />
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.dashboard-page {
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

    &__action-buttons {
        grid-column: span 12;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: minmax(500px, 40vh) minmax(160px, 20vh) minmax(160px, 20vh);
        gap: var(--space-16);

        @include styles-for(tablet) {
            grid-template-rows: minmax(400px, 40vh) minmax(200px, 20vh);
            gap: var(--space-24);
        }

        @include styles-for(desktop) {
            grid-template-rows: 1fr 25vh;
            grid-column: span 8;
            gap: var(--space-32);
        }
    }

    &__start-game {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;

        grid-column: span 2;

        @include styles-for(tablet) {
            flex-direction: column;
        }
    }

    &__start-game-options {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        @include styles-for(tablet) {
            flex-direction: row;
        }
    }

    &__start-game-options-deco {
        position: absolute;
        bottom: -1rem;
        left: 1rem;
        height: 140px;
        width: auto;

        @include styles-for(tablet) {
            height: 160px;
        }

        @include styles-for(desktop) {
            height: 180px;
        }
    }

    &__create-game,
    &__enter-game-code {
        position: relative;
        border-radius: var(--border-radius-20);
        padding: var(--space-16);
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        height: 140px;
        width: 260px;

        @include styles-for(tablet) {
            height: 180px;
            width: 300px;
        }

        @include styles-for(desktop) {
            height: 220px;
            width: 340px;
        }

        & > div {
            color: var(--clr-neutral-100);
            display: flex;
            align-items: center;
            gap: var(--space-16);
            z-index: 1;
        }
    }

    &__create-game {
        background: var(--gradient-turqoise);
        border: 2px solid var(--clr-turqoise-500);
        color: var(--clr-turqoise-500);
    }

    &__enter-game-code {
        background: var(--gradient-red);
        border: 2px solid var(--clr-red-500);
        color: var(--clr-red-500);
    }

    &__profile {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        grid-column: span 2;

        @include styles-for(tablet) {
            grid-column: span 1;
        }
    }

    &__dartboards {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        grid-column: span 2;

        @include styles-for(tablet) {
            grid-column: span 1;
        }
    }

    &__friends-list {
        grid-column: span 12;
        min-height: 31.25rem;

        @include styles-for(desktop) {
            grid-column: span 4;
        }
    }
}
</style>
