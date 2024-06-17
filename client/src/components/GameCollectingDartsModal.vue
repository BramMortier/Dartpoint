<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useModalStore } from "@/stores/modalStore"
import { useGameStore } from "@/stores/gameStore"
import { storeToRefs } from "pinia"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { closeModal } = useModalStore()
const { isCollectingDarts, currentTurn } = storeToRefs(useGameStore())

// =============================================================================
// Functions
// =============================================================================
const startNextTurn = () => {
    closeModal()

    isCollectingDarts.value = false
    currentTurn.value = []
}
</script>

<template>
    <div class="game-collecting-darts-modal">
        <h2>Collecting Darts...</h2>

        <p class="typo-body-large">You can now safely collect your darts for the next turn</p>

        <div class="game-collecting-darts-modal__action-buttons">
            <BaseButton class="base-button--secondary" @click="startNextTurn">Next turn</BaseButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-collecting-darts-modal {
    display: flex;
    flex-direction: column;
    gap: var(--space-32);
    width: 31.25rem;

    &__action-buttons {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
