// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"

// =============================================================================
// Store configuration
// =============================================================================
export const useGameStore = defineStore("game", () => {
    const gameSettings = useStorage("game-settings", {})
    const players = useStorage("players", [])
    const gameInfo = useStorage("game-info", [])

    const resetGame = () => {
        gameSettings.value = {}
        players.value = []
        gameInfo.value = []
    }

    return { gameSettings, players, gameInfo, resetGame }
})
