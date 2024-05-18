<script setup>
// =============================================================================
// Imports
// =============================================================================
import { WordmarkHorizontalLight, EyeClosed, EyeOpen } from "@/components/icons"

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
    "wordmark-horizontal-light": WordmarkHorizontalLight,
    "eye-open": EyeOpen,
    "eye-closed": EyeClosed
}
</script>

<template>
    <component class="base-icon" :class="props.class" :is="iconMap[props.name]" />
</template>

<style scoped lang="scss"></style>
