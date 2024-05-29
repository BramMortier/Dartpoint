<script setup>
// =============================================================================
// Imports
// =============================================================================
import { RouterView, useRouter } from "vue-router"

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
    <div class="dartboards-page">
        <BaseContainer class="dartboards-page__recent-devices" :is-clickable="false">
            <RouterView />
        </BaseContainer>

        <BaseContainer
            class="dartboards-page__add-board"
            @click="router.push({ name: 'DartboardsConnect' })"
        >
            <h2>Add new dartboard</h2>
        </BaseContainer>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.dartboards-page {
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

    &__recent-devices {
        grid-column: span 8;
    }

    &__add-board {
        grid-column: span 4;
        justify-content: flex-end;
        width: 100%;
        height: 180px;

        @include styles-for(tablet) {
            height: 200px;
        }

        @include styles-for(desktop) {
            height: max(33vh, 300px);
        }
    }
}
</style>
