// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { ref } from "vue"

// =============================================================================
// Store configuration
// =============================================================================
export const useGameStore = defineStore("game", () => {
    const gameSettings = useStorage("game-settings", {})
    const players = useStorage("players", {})
    const gameHistory = useStorage("game-history", {})

    return { gameSettings, players, gameHistory }
})
