<script setup>
// =============================================================================
// Imports
// =============================================================================
import { FriendsListItem } from "@/components/index"

import { useRouter, useRoute, RouterView } from "vue-router"
import { useGameStore } from "@/stores/gameStore"
import { useBoardStore } from "@/stores/boardStore"
import { storeToRefs } from "pinia"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const route = useRoute()
const router = useRouter()

const { players } = storeToRefs(useGameStore())
const { connectedBoard } = storeToRefs(useBoardStore())

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="game-settings-page">
        <div class="game-settings-page__lobby-info">
            <BaseContainer class="game-settings-page__lobby-players" :is-clickable="false">
                <BaseContainerTitle title="Lobby" :show-back-button="false" />

                <p class="typo-body-large">{{ players.length }} Players</p>

                <ul class="game-settings-page__lobby-players-list">
                    <FriendsListItem
                        v-for="item in players"
                        :show-profile-picture="true"
                        :name="item.displayName"
                        :info="connectedBoard.name"
                    />

                    <div class="game-settings-page__lobby-add-player">
                        <BaseButton
                            class="base-button--tertiary"
                            @click="
                                router.push({
                                    name: 'GameAddGuest',
                                    params: { id: route.params.id }
                                })
                            "
                        >
                            Add guest
                        </BaseButton>
                    </div>
                </ul>
            </BaseContainer>

            <BaseContainer class="game-settings-page__lobby-code" :is-clickable="false">
                <p class="typo-body-large">Game code</p>

                <div class="game-settings-page__lobby-code-string">
                    <span class="typo-h1">{{ route.params.id }}</span>

                    <BaseIcon name="copy-to-clipboard" />
                </div>
            </BaseContainer>
        </div>

        <BaseContainer class="game-settings-page__main" :is-clickable="false">
            <RouterView />
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-settings-page {
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

    &__lobby-info {
        grid-column: span 4;
        display: flex;
        flex-direction: column;
        gap: var(--space-16);

        @include styles-for(tablet) {
            gap: var(--space-24);
        }

        @include styles-for(desktop) {
            gap: var(--space-32);
        }
    }

    &__lobby-players {
        min-height: 25rem;
        gap: var(--space-16);

        & > div {
            display: flex;
            align-items: center;
            gap: var(--space-24);
            color: var(--clr-neutral-100);

            & > .base-icon:hover {
                cursor: pointer;
            }
        }
    }

    &__lobby-players-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
    }

    &__lobby-add-player {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;

        background-color: var(--clr-neutral-700);
        border: 1px solid var(--clr-neutral-500);
        border-radius: var(--border-radius-10);
    }

    &__lobby-code {
        gap: var(--space-4);
    }

    &__lobby-code-string {
        display: flex;
        gap: var(--space-16);

        &:hover {
            cursor: pointer;
        }

        & > span {
            font-size: var(--fs-32);

            @include styles-for(desktop) {
                font-size: var(--fs-48);
            }
        }

        & > .base-icon {
            height: 1.5rem;
            width: auto;
            color: var(--clr-neutral-100);

            @include styles-for(desktop) {
                height: 1.75rem;
            }
        }
    }

    &__main {
        grid-column: span 8;
    }
}
</style>
