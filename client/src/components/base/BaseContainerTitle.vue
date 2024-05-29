<script setup>
// =============================================================================
// Imports
// =============================================================================
import { useRouter } from "vue-router"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    title: String,
    explanation: String
})

// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const router = useRouter()
</script>

<template>
    <div class="base-container-title">
        <div>
            <BaseIcon name="arrow-left" @click="router.back()" />

            <h2>{{ props.title }}</h2>
        </div>

        <p class="typo-body-large">{{ props.explanation }}</p>
    </div>
</template>

<style scoped lang="scss">
.base-container-title {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);

    & > div {
        display: flex;
        align-items: center;
        gap: var(--space-24);
        color: var(--clr-neutral-100);

        & > .base-icon:hover {
            cursor: pointer;
        }
    }
}
</style>
