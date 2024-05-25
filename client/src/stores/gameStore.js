// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"
import { ref } from "vue"

// =============================================================================
// Store configuration
// =============================================================================
export const useGameStore = defineStore("game", () => {
    const gameSettings = ref({})
    const players = ref({})
    const history = ref({})

    const quitGame = () => {
        gameSettings.value = {}
        players.value = {}
        history.value = {}
    }

    return { gameSettings, players, history, quitGame }
})
