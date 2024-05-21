<script setup>
// =============================================================================
// Imports
// =============================================================================
import {
    LogoWordmarkHorizontal,
    LogoIcon,
    EyeClosed,
    EyeOpen,
    ChevronDown,
    ArrowRight
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
    "logo-wordmark-horizontal": LogoWordmarkHorizontal,
    "logo-icon": LogoIcon,
    "eye-open": EyeOpen,
    "eye-closed": EyeClosed,
    "chevron-down": ChevronDown,
    "arrow-right": ArrowRight
}
</script>

<template>
    <component class="base-icon" :class="props.class" :is="iconMap[props.name]" />
</template>

<style scoped lang="scss"></style>
