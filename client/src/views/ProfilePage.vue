<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useRouter } from "vue-router"

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
    <div class="profile-page">
        <BaseContainer class="profile-page__profile-overview" :is-clickable="false">
            <BaseContainerTitle title="Profile" />
        </BaseContainer>

        <div class="profile-page__action-buttons">
            <BaseContainer class="profile-page__graph" :is-clickable="false">
                <h2>Graph</h2>
            </BaseContainer>

            <BaseContainer class="profile-page__game-history">
                <h2>Game history</h2>
            </BaseContainer>

            <BaseContainer
                class="profile-page__friends"
                @click="router.push({ name: 'FriendsPage' })"
            >
                <h2>Friends</h2>
            </BaseContainer>

            <BaseContainer class="profile-page__challanges">
                <h2>Challanges</h2>
            </BaseContainer>

            <BaseContainer class="profile-page__more-statistics">
                <h2>More statistics</h2>
            </BaseContainer>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.profile-page {
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

    &__profile-overview {
        grid-column: span 4;
    }

    &__action-buttons {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: minmax(400px, 40vh) minmax(200px, 1fr) minmax(200px, 1fr);
        gap: var(--space-32);

        grid-column: span 8;
    }

    &__graph {
        grid-column: span 2;
    }

    &__game-history,
    &__friends,
    &__challanges,
    &__more-statistics {
        justify-content: flex-end;
    }
}
</style>
