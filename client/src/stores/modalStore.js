// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { ref, markRaw } from "vue"

// =============================================================================
// Store configuration
// =============================================================================
const defaultState = { component: null, props: {} }

export const useModalStore = defineStore("modal", () => {
    const modalState = ref(defaultState)

    const openModal = ({ component, props }) => {
        modalState.value = { component: markRaw(component), props: props || {} }
    }

    const closeModal = () => {
        modalState.value = defaultState
    }

    return { modalState, openModal, closeModal }
})
