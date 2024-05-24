<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsList, GameStartOptions } from "@/components/index"
import { useRouter } from "vue-router"

import cryptoRandomString from "crypto-random-string"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="dashboard-page">
        <div class="dashboard-page__action-buttons">
            <BaseContainer
                class="dashboard-page__start-game"
                @click="
                    router.push({
                        name: 'GameSettingsPage',
                        params: { id: cryptoRandomString({ length: 8, type: 'distinguishable' }) }
                    })
                "
            >
                <GameStartOptions />

                <h1>
                    Start a game <br />
                    or throw a dart
                </h1>
            </BaseContainer>

            <BaseContainer
                class="dashboard-page__profile"
                @click="router.push({ name: 'ProfilePage' })"
            >
                <h2>Profile & statistics</h2>
            </BaseContainer>

            <BaseContainer class="dashboard-page__dartboards">
                <h2>My dartboards</h2>
            </BaseContainer>
        </div>

        <BaseContainer class="dashboard-page__friends-list" :is-clickable="false">
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
        flex-direction: column-reverse;
        justify-content: space-between;

        grid-column: span 2;

        @include styles-for(tablet) {
            flex-direction: column;
        }
    }

    &__profile {
        justify-content: flex-end;
        grid-column: span 2;

        @include styles-for(tablet) {
            grid-column: span 1;
        }
    }

    &__dartboards {
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
