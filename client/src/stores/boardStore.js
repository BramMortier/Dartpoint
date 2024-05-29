// =============================================================================
// Imports
// =============================================================================
import { defineStore } from "pinia"
import { ref } from "vue"

// =============================================================================
// Store configuration
// =============================================================================
export const useBoardStore = defineStore("board", () => {
    const connectedBoard = ref("DP_KW5PPYWD")

    return { connectedBoard }
})
