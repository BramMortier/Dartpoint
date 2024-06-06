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
const { gameInfo, currentPlayer } = storeToRefs(useGameStore())

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const currentPlayerTurns = computed(() => gameInfo.value[currentPlayer.value.id].turns)

const totalPoints = computed(() => {
    if (currentPlayerTurns.value.length === 0) return 0
    return currentPlayerTurns.value.reduce((sum, item) => sum + item.total, 0)
})

const dartsThrown = computed(() => {
    if (currentPlayerTurns.value.length === 0) return 0
    return currentPlayerTurns.value.length * 3
})

const average = computed(() => {
    if (currentPlayerTurns.value.length === 0) return 0

    const totalTurns = currentPlayerTurns.value.length
    const totalScoreSum = currentPlayerTurns.value.reduce((sum, item) => {
        return sum + item.dart1_score + item.dart2_score + item.dart3_score
    }, 0)

    return parseFloat((totalScoreSum / totalTurns).toFixed(1))
})

const First9DartsAverage = computed(() => {
    if (currentPlayerTurns.value.length === 0) return 0

    const firstThreeTurns = currentPlayerTurns.value.slice(0, 3)
    const totalFirstThreeTurns = firstThreeTurns.reduce((sum, item) => sum + item.total, 0)

    return parseFloat((totalFirstThreeTurns / firstThreeTurns.length).toFixed(1))
})

const Triple20Percentage = computed(() => {
    if (currentPlayerTurns.value.length === 0) return 0

    const totalDarts = currentPlayerTurns.value.length * 3
    const count = currentPlayerTurns.value.reduce((sum, item) => {
        return (
            sum +
            (item.dart1_zone === 20 && item.dart1_multiplier === 3 ? 1 : 0) +
            (item.dart2_zone === 20 && item.dart2_multiplier === 3 ? 1 : 0) +
            (item.dart3_zone === 20 && item.dart3_multiplier === 3 ? 1 : 0)
        )
    }, 0)

    return parseFloat(((count / totalDarts) * 100).toFixed(1))
})

const highestThrow = computed(() => {
    return currentPlayerTurns.value.reduce((max, item) => (item.total > max ? item.total : max), 0)
})

const throwsAbove100 = computed(() => {
    return currentPlayerTurns.value.filter((item) => item.total > 100).length
})

const throwsAbove140 = computed(() => {
    return currentPlayerTurns.value.filter((item) => item.total > 140).length
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
        <GameStatisticsItem name="Highest" :value="highestThrow" />
        <GameStatisticsItem name="T20 Percentage" :value="`${Triple20Percentage}%`" />
    </ul>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.game-statistics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-24) var(--space-48);

    & > .game-statistics-item:nth-child(3),
    & > .game-statistics-item:nth-child(4) {
        display: none;

        @include styles-for(desktop) {
            display: flex;
        }
    }

    @include styles-for(desktop) {
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-32) var(--space-64);
    }
}
</style>
