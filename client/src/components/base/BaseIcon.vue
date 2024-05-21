<script setup>
// =============================================================================
// Imports
// =============================================================================
import {
    LogoWordmarkHorizontalLight,
    LogoIconLight,
    EyeClosed,
    EyeOpen,
    ChevronDown
} from "@/components/icons"

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
    "logo-wordmark-horizontal-light": LogoWordmarkHorizontalLight,
    "logo-icon-light": LogoIconLight,
    "eye-open": EyeOpen,
    "eye-closed": EyeClosed,
    "chevron-down": ChevronDown
}
</script>

<template>
    <component class="base-icon" :class="props.class" :is="iconMap[props.name]" />
</template>

<style scoped lang="scss"></style>
