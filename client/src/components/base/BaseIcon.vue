<script setup>
// =============================================================================
// Imports
// =============================================================================
import { WordmarkHorizontalLight } from "@/components/icons"

// =============================================================================
// Props & Events
// =============================================================================
const props = defineProps({
    name: String,
    class: String
})
// =============================================================================
// Composables, Refs & Computed
// =============================================================================
const iconMap = {
    "wordmark-horizontal-light": WordmarkHorizontalLight
}
</script>

<template>
    <component :class="props.class" :is="iconMap[props.name]" />
</template>

<style scoped lang="scss"></style>
