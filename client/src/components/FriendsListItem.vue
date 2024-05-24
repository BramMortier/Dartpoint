<script setup>
// =============================================================================
// Imports
// =============================================================================

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    user: Object,
    name: String,
    isOnline: Boolean,
    status: String,
    connectedBoard: String,
    showStatusIndicator: { type: Boolean, default: true },
    showProfilePicture: Boolean
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================

// =============================================================================
// Functions
// =============================================================================
</script>

<template>
    <li class="friends-list-item" :class="{ 'friends-list-item--offline': !props.isOnline }">
        <div>
            <div v-if="props.showProfilePicture" class="friends-list-item__profile-picture"></div>

            <div class="friends-list-item__info">
                <h3>{{ props.name }}</h3>

                <div class="friends-list-item__status">
                    <div v-if="showStatusIndicator"></div>

                    <p>{{ props.status }}</p>
                </div>

                <p>{{ props.connectedBoard }}</p>
            </div>
        </div>

        <div class="friends-list-item__action-buttons">
            <slot></slot>
        </div>
    </li>
</template>

<style scoped lang="scss">
.friends-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-500);
    border-radius: var(--border-radius-10);
    padding: var(--space-16);

    &--offline {
        opacity: 50%;

        .friends-list-item__status > div {
            background: var(--clr-neutral-500);
            border: none;
        }
    }

    & > div {
        display: flex;
        align-items: center;
        gap: var(--space-24);
    }

    &__profile-picture {
        width: 70px;
        height: 70px;
        border-radius: var(--border-radius-10);
        background-color: var(--clr-neutral-800);
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    &__status {
        display: flex;
        align-items: center;
        gap: var(--space-12);

        & > div {
            height: 1rem;
            width: 1rem;
            border-radius: var(--border-radius-round);
            background: var(--gradient-turqoise);
            border: 2px solid var(--clr-turqoise-500);
        }
    }
}
</style>
