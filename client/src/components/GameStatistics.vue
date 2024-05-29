<script setup>
// =============================================================================
// Imports
// =============================================================================
import { GameStatisticsItem } from "@/components/index"
import { useGameStore } from "@/stores/gameStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"

// =============================================================================
// Props & Events
// =============================================================================
const { gameInfo } = storeToRefs(useGameStore())

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const totalPoints = computed(() => gameInfo.value.reduce((sum, item) => sum + item.total, 0))

const dartsThrown = computed(() => gameInfo.value.length * 3)

const average = computed(() => {
    const totalDarts = gameInfo.value.length * 3
    const totalScoreSum = gameInfo.value.reduce((sum, item) => {
        return sum + item.dart1Score + item.dart2Score + item.dart3Score
    }, 0)
    return totalDarts > 0 ? totalScoreSum / totalDarts : 0
})

const First9DartsAverage = computed(() => {
    const firstThreeThrows = gameInfo.value.slice(0, 3) // Get the first three throws
    const totalFirstThreeThrows = firstThreeThrows.reduce((sum, item) => sum + item.total, 0)
    const totalDarts = firstThreeThrows.length * 3 // Each throw has 3 darts
    return totalDarts > 0 ? totalFirstThreeThrows / totalDarts : 0
})

const Triple20Percentage = computed(() => {
    const totalDarts = gameInfo.value.length * 3
    const count = gameInfo.value.reduce((sum, item) => {
        return (
            sum +
            (item.dart1Sector === 20 && item.dart1Multiplier === 3 ? 1 : 0) +
            (item.dart2Sector === 20 && item.dart2Multiplier === 3 ? 1 : 0) +
            (item.dart3Sector === 20 && item.dart3Multiplier === 3 ? 1 : 0)
        )
    }, 0)
    return totalDarts > 0 ? (count / totalDarts) * 100 : 0
})

const highestThrow = computed(() => {
    return gameInfo.value.reduce((max, item) => (item.total > max ? item.total : max), 0)
})

const throwsAbove100 = computed(() => {
    return gameInfo.value.filter((item) => item.total > 100).length
})

const throwsAbove140 = computed(() => {
    return gameInfo.value.filter((item) => item.total > 140).length
})
</script>

<template>
    <ul class="game-statistics">
        <GameStatisticsItem name="Average" :value="average" />
        <GameStatisticsItem name="9 Dart average" :value="First9DartsAverage" />
        <GameStatisticsItem name="Total points" :value="totalPoints" />
        <GameStatisticsItem name="Darts thrown" :value="dartsThrown" />

        <GameStatisticsItem name="100+" :value="throwsAbove100" />
        <GameStatisticsItem name="140+" :value="throwsAbove140" />
        <GameStatisticsItem name="Highest score" :value="highestThrow" />
        <GameStatisticsItem name="T20 Percentage" :value="`${Triple20Percentage}%`" />
    </ul>
</template>

<style scoped lang="scss">
.game-statistics {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: var(--space-32) var(--space-96);
}
</style>
