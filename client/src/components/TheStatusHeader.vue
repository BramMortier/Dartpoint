<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useWindowSize } from "@vueuse/core"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    isLoggedIn: Boolean
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { width: screenWidth } = useWindowSize()

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <header class="header">
        <BaseIcon
            class="header__logo"
            :name="screenWidth > 768 ? 'logo-wordmark-horizontal-light' : 'logo-icon-light'"
        />

        <div v-if="isLoggedIn" class="header__connected-board">
            <h4>Connected board</h4>

            <div class="header__connected-board-info">
                <p>Dartshop Madhouse</p>

                <span></span>

                <p>DP859623</p>
            </div>
        </div>

        <div v-if="isLoggedIn" class="header__user">
            <div class="header__user-info">
                <h4>Bram Mortier</h4>

                <div class="header__user-status">
                    <div></div>

                    <p>Online, Browsing Dashboard</p>

                    <BaseIcon name="chevron-down" />
                </div>
            </div>

            <img
                class="header__user-profile-picture"
                src="@/assets/images/profile-picture-placeholder.webp"
                alt="profile-picture-placeholder"
            />
        </div>
    </header>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include styles-for(desktop) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    &__logo {
        max-height: 2.75rem;
        height: 100%;
        width: auto;

        @include styles-for(tablet) {
            max-height: 3rem;
        }
    }

    &__connected-board {
        display: none;

        @include styles-for(desktop) {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-4);
        }
    }

    &__connected-board-info {
        display: flex;
        align-items: center;
        gap: var(--space-12);

        & > span {
            height: 20px;
            width: 1px;
            background-color: var(--clr-neutral-400);
        }
    }

    &__user {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-16);

        @include styles-for(desktop) {
            gap: var(--space-24);
        }
    }

    &__user-profile-picture {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: var(--border-radius-10);
        border: 2px solid var(--clr-turqoise-500);
        padding: var(--space-4);

        @include styles-for(tablet) {
            width: 4.375rem;
            height: 4.375rem;
        }
    }

    &__user-info {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;
        gap: var(--space-4);
    }

    &__user-status {
        display: none;
        align-items: center;
        width: fit-content;
        gap: var(--space-12);

        @include styles-for(tablet) {
            display: flex;
        }

        & > div {
            height: 1rem;
            width: 1rem;
            border-radius: var(--border-radius-round);
            background: var(--gradient-turqoise);
        }

        & > .base-icon {
            width: 1rem;
            color: var(--clr-neutral-400);
        }
    }
}
</style>
