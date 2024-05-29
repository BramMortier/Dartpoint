<script setup>
// =============================================================================
// Imports
// =============================================================================
import { DartboardsListItem } from "@/components/index"
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
    <BaseContainerTitle title="Recent devices" />

    <ul class="dartboards-list">
        <DartboardsListItem
            board-name="Dartpoint jurymarkt"
            board-code="DP_KW5PPYWD"
            :total-games="67"
        />
        <DartboardsListItem
            board-name="Dartpoint mancave"
            board-code="DP_344DG7W"
            :total-games="785"
        />
    </ul>
</template>

<style scoped lang="scss">
.dartboards-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-32);
}
</style>
