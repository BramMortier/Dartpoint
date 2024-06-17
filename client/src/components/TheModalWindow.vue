<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useModalStore } from "@/stores/modalStore"
import { storeToRefs } from "pinia"

const { closeModal } = useModalStore()
const { modalState } = storeToRefs(useModalStore())
</script>

<template>
    <Teleport to="#modals">
        <Transition name="the-modal-window-transition">
            <div
                class="the-modal-window__wrapper"
                @click.self="closeModal"
                v-if="modalState?.component"
            >
                <div class="the-modal-window">
                    <component :is="modalState?.component" v-bind="modalState?.props" />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixins.scss" as *;

.the-modal-window {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding: var(--space-16);
    background-color: var(--clr-neutral-800);
    border: 1px solid var(--clr-neutral-600);
    border-radius: var(--border-radius-20);
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;

    @include styles-for(desktop) {
        padding: var(--space-24);
        gap: var(--space-32);
    }

    &__wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(7px);
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.the-modal-window-transition-enter-from,
.the-modal-window-transition-leave-to {
    opacity: 0;
}

.the-modal-window-transition-enter-active,
.the-modal-window-transition-leave-active {
    transition: 0.25s ease all;
}
</style>
