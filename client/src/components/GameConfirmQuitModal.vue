<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useModalStore } from "@/stores/modalStore"
import { useRouter } from "vue-router"

// =============================================================================
// Props & Events
// =============================================================================

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { closeModal } = useModalStore()
const router = useRouter()

// =============================================================================
// Functions
// =============================================================================
const confirmQuit = () => {
    closeModal()

    router.push({ name: "DashboardPage" })
}
</script>

<template>
    <div class="game-confirm-quit-modal">
        <h2>Quit?</h2>

        <p class="typo-body-large">
            Are u sure u want to quit the game? You will lose your stats for this game
        </p>

        <div class="game-confirm-quit-modal__action-buttons">
            <BaseButton class="base-button--tertiary" @click="closeModal"> Cancel </BaseButton>
            <BaseButton @click="confirmQuit">Quit game</BaseButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-confirm-quit-modal {
    display: flex;
    flex-direction: column;
    gap: var(--space-32);
    width: 31.25rem;

    &__action-buttons {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-16);
    }
}
</style>
