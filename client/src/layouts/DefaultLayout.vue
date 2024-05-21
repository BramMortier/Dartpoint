<script setup>
// =============================================================================
// Imports
// =============================================================================
import { TheStatusHeader } from "@/components/index"
</script>

<template>
    <div class="default-layout">
        <div class="default-layout__content">
            <TheStatusHeader :is-logged-in="true" />

            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.default-layout {
    min-height: 100vh;
    display: grid;
    padding-block: var(--space-16);
    grid-template-columns: auto var(--space-16) minmax(0, 2000px) var(--space-16) auto;

    @include styles-for(tablet) {
        padding-block: var(--space-24);
        grid-template-columns: auto var(--space-24) minmax(0, 2000px) var(--space-24) auto;
    }

    @include styles-for(desktop) {
        padding-block: var(--space-32);
        grid-template-columns: auto var(--space-32) minmax(0, 2000px) var(--space-32) auto;
    }

    &__content {
        grid-column: 3 / 4;
        display: flex;
        flex-direction: column;
        gap: var(--space-32);
    }

    main {
        height: 100%;
    }
}
</style>
