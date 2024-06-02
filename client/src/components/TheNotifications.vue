<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useNotificationStore } from "@/stores/notificationStore"
import { storeToRefs } from "pinia"

import TheNotification from "@/components/TheNotification.vue"

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const { notifications } = storeToRefs(useNotificationStore())
</script>

<template>
    <Teleport to="#notifications">
        <ul class="the-notifications">
            <TransitionGroup name="the-notification-transition">
                <TheNotification
                    v-for="(notificationConfig, index) in notifications"
                    :key="index"
                    :config="notificationConfig"
                />
            </TransitionGroup>
        </ul>
    </Teleport>
</template>

<style lang="scss" scoped>
.the-notifications {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: var(--space-16);

    left: 50%;
    transform: translateX(-50%);
    bottom: var(--space-64);
    z-index: 999;
}

.the-notification-transition-enter-from,
.the-notification-transition-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

.the-notification-transition-enter-active,
.the-notification-transition-leave-active {
    transition: 0.15s ease-out all;
}
</style>
