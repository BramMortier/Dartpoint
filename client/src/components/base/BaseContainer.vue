<script setup></script>

<template>
    <div class="base-container">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins.scss" as *;

.base-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding: var(--space-16);
    background-color: var(--clr-neutral-800);
    border: 1px solid var(--clr-neutral-600);
    border-radius: var(--border-radius-20);

    @include styles-for(desktop) {
        padding: var(--space-24);
        gap: var(--space-32);
    }
}
</style>
