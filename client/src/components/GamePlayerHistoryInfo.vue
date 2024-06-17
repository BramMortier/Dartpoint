<script setup>
// =============================================================================
// Imports
// =============================================================================
import { LogoIconSplit } from "@/components/icons/index"
import { useGameStore } from "@/stores/gameStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    info: Object
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { gameInfo, currentPlayer } = storeToRefs(useGameStore())

const gamePlayerHistoryInfo = computed(() => {
    return [
        {
            label: "Current session",
            scores: gameInfo.value[currentPlayer.value.id].turns
                .map((turn) => {
                    return {
                        dartsThrown: [turn.thrown1, turn.thrown2, turn.thrown3].filter(Boolean)
                            .length,
                        totalScore: turn.total
                    }
                })
                .slice(-10)
                .reverse()
        }
    ]
})

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <div class="game-history-info">
        <div class="game-history-info__main">
            <ul v-for="group in gamePlayerHistoryInfo" class="game-history-info__group">
                <p>{{ group.label }}</p>

                <li v-for="item in group.scores" class="game-history-info__item">
                    <LogoIconSplit :darts-thrown="item.dartsThrown" />

                    <p class="typo-h2">{{ item.totalScore }}</p>
                </li>
            </ul>
        </div>

        <BaseButton class="base-button--tertiary">Open history</BaseButton>
    </div>
</template>

<style scoped lang="scss">
.game-history-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > .base-button {
        width: 100%;
    }

    &__main {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-48);
    }

    &__group {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    &__item {
        display: flex;
        gap: var(--space-16);

        & > .logo-icon-split {
            margin-top: var(--space-16);
            height: 24px;
            width: auto;
        }

        & > p {
            font-size: var(--fs-48);
        }

        &:first-child > p {
            font-size: var(--fs-64);
        }
    }
}
</style>
