// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"

// =============================================================================
// Store configuration
// =============================================================================
export const useBoardStore = defineStore("board", () => {
    const connectedBoard = useStorage("connected-board", {})

    const connect = (board) => {
        connectedBoard.value = board
    }

    const disconnect = () => {
        connectedBoard.value = {}
    }

    return { connectedBoard, connect, disconnect }
})
