// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { ref } from "vue"

// =============================================================================
// Store configuration
// =============================================================================
export const useGameStore = defineStore("game", () => {
    const gameSettings = ref({})
    const players = ref({})
    const history = ref({})

    return { gameSettings, players, history }
})
