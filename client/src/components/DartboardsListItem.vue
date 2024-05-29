<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useBoardStore } from "@/stores/boardStore"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    boardName: String,
    boardCode: String,
    totalGames: Number,
    lastOnline: Date
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { connectedBoard } = useBoardStore()

// =============================================================================
// Functions
// =============================================================================
const connect = (boardCode) => (connectedBoard.value = boardCode)

const disconnect = () => (connectedBoard.value = null)
</script>

<template>
    <div class="dartboards-list-item">
        <div class="dartboards-list-item__status">
            <div class="dartboards-list-item__status-info">
                <h3>{{ props.boardName }}</h3>

                <div>
                    <div
                        class="dartboards-list-item__status-indicator"
                        :class="{
                            'dartboards-list-item__status-indicator--off':
                                props.boardCode !== connectedBoard
                        }"
                    ></div>

                    <p>{{ props.boardCode === connectedBoard ? "Connected" : "Not connected" }}</p>
                </div>
            </div>

            <div class="dartboards-list-item__action-button">
                <BaseButton
                    v-if="props.boardCode !== connectedBoard"
                    class="base-button--tertiary"
                    @click="connect(props.boardCode)"
                >
                    Connect
                </BaseButton>

                <BaseButton
                    v-if="props.boardCode === connectedBoard"
                    class="base-button--tertiary"
                    @click="disconnect"
                >
                    Disconnect
                </BaseButton>
            </div>
        </div>

        <ul class="dartboards-list-item__info">
            <li class="dartboards-list-item__info-item">
                <p>Total games</p>

                <p class="typo-h3">{{ props.totalGames }}</p>
            </li>

            <li class="dartboards-list-item__info-item">
                <p>Last online</p>

                <p class="typo-h3">1d ago</p>
            </li>

            <li class="dartboards-list-item__info-item">
                <p>Board code</p>

                <p class="typo-h3">{{ props.boardCode }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.dartboards-list-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-64);
    justify-content: space-between;
    min-height: 240px;

    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-500);
    border-radius: var(--border-radius-20);
    padding: var(--space-16);

    &__status {
        display: flex;
        justify-content: space-between;
    }

    &__status-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);

        & > div {
            display: flex;
            align-items: center;
            gap: var(--space-12);
        }
    }

    &__status-indicator {
        height: 1rem;
        width: 1rem;
        border-radius: var(--border-radius-round);
        background: var(--gradient-turqoise);
        border: 2px solid var(--clr-turqoise-500);

        &--off {
            background: var(--clr-neutral-500);
            border: none;
        }
    }

    &__info {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-8) var(--space-64);
    }

    &__info-item {
        display: flex;
        flex-direction: column;
    }
}
</style>
