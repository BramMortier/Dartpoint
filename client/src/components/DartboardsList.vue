<script setup>
// =============================================================================
// Imports
// =============================================================================
import { DartboardsListItem } from "@/components/index"
import { boardsApi } from "@/services/api/boardsApi"
import { onMounted, ref } from "vue"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const boards = ref(null)
// =============================================================================
// Lifecycle hooks
// =============================================================================
onMounted(async () => {
    const { status, message, body } = await boardsApi.getBoards()

    console.log(status, message, body)

    boards.value = body.boards
})

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <BaseContainerTitle title="Recent devices" />

    <ul class="dartboards-list">
        <DartboardsListItem v-for="item in boards" :board="item.board" :total-games="67" />
    </ul>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.dartboards-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: var(--space-32);

    @include styles-for(tablet) {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-32);
    }
}
</style>
