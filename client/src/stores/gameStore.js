// =============================================================================
// Imports
// =============================================================================
import { GameCollectingDartsModal } from "@/components"
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { useModalStore } from "./modalStore"
import { computed, ref } from "vue"

// =============================================================================
// Store configuration
// =============================================================================
export const useGameStore = defineStore("game", () => {
    const { openModal } = useModalStore()

    const gameSettings = useStorage("game-settings", {})
    const players = useStorage("players", [])
    const gameInfo = useStorage("game-info", {})
    const currentTurn = useStorage("current-turn", [])

    const isCollectingDarts = ref(false)

    const currentPlayer = computed(() => players.value.find((player) => player.isPlaying))

    const addPlayer = (playerData) => {
        console.log(playerData)

        playerData.isPlaying = players.value.length === 0

        players.value.push(playerData)

        gameInfo.value = {
            ...gameInfo.value,
            [playerData.id]: { turns: [] }
        }
    }

    const addThrow = (throwData) => {
        if (isCollectingDarts.value) return

        currentTurn.value.push(throwData)

        console.log(currentTurn.value.length)

        if (currentTurn.value.length === 3) {
            let formattedThrow = {}
            let counter = 1

            currentTurn.value.forEach((turn) => {
                for (let [key, value] of Object.entries(turn)) {
                    if (key === "thrown") key = key.replace("thrown", `thrown${counter}`)
                    key = key.replace("dart_", `dart${counter}_`)

                    formattedThrow[key] = value
                }
                counter++
            })

            const totalScore =
                formattedThrow.dart1_score + formattedThrow.dart2_score + formattedThrow.dart3_score

            formattedThrow.total = totalScore
            formattedThrow.user_id = currentPlayer.value.id

            gameInfo.value[currentPlayer.value.id].turns.push(formattedThrow)

            isCollectingDarts.value = true
            openModal({ component: GameCollectingDartsModal })

            // Enable when automatic removing of darts is added back
            // currentTurn.value = []
        }
    }

    const resetGame = () => {
        gameSettings.value = {}
        players.value = []
        gameInfo.value = {}
        currentTurn.value = []
    }

    return {
        gameSettings,
        players,
        gameInfo,
        currentTurn,
        isCollectingDarts,
        currentPlayer,
        resetGame,
        addThrow,
        addPlayer
    }
})
