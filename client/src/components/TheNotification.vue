<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useNotificationStore } from "@/stores/notificationStore"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { removeNotification } = useNotificationStore()

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    config: Object
})
</script>

<template>
    <li
        class="the-notification"
        :class="{ 'the-notification--error': props.config.type === 'error' }"
    >
        <h3>{{ props.config.message }}</h3>

        <BaseIcon name="close" @click="removeNotification(props.config.id)" />
    </li>
</template>

<style scoped lang="scss">
.the-notification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-32);
    min-width: 31.25rem;

    padding: var(--space-16) var(--space-24);
    background: var(--gradient-turqoise);
    border: 1px solid var(--clr-turqoise-500);
    outline-offset: var(--space-4);
    border-radius: var(--border-radius-20);

    &--error {
        background: var(--gradient-red);
        border: 1px solid var(--clr-red-500);
    }

    & > .base-icon {
        height: 1.5rem;
        width: auto;
        color: var(--clr-neutral-100);
        cursor: pointer;
    }
}
</style>
