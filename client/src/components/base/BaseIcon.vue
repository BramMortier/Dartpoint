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
    ArrowRight,
    ArrowLeft,
    Medal,
    History,
    Statistics,
    CopyToClipboard,
    Plus,
    FlagBelgium,
    Close
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
    "arrow-right": ArrowRight,
    "arrow-left": ArrowLeft,
    "copy-to-clipboard": CopyToClipboard,
    "flag-belgium": FlagBelgium,
    close: Close,
    history: History,
    medal: Medal,
    plus: Plus,
    statistics: Statistics
}
</script>

<template>
    <component class="base-icon" :class="props.class" :is="iconMap[props.name]" />
</template>

<style scoped lang="scss"></style>
