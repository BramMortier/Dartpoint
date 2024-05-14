<script setup>
import "@/assets/styles/index.scss"
</script>

<template>
    <div class="typo-test">
        <p>Campton Black</p>
        <p>Campton ExtraBold</p>
        <p>Campton Bold</p>
        <p>Campton SemiBold</p>
        <p>Campton Medium</p>
        <p>Campton Book</p>
        <p>Campton Light</p>
        <p>Campton Extra Light</p>
        <p>Campton Thin</p>
    </div>
</template>

<style scoped>
.typo-test {
    font-family: "Campton", sans-serif;

    p:nth-child(1) {
        font-weight: 900;
    }

    p:nth-child(2) {
        font-weight: 800;
    }

    p:nth-child(3) {
        font-weight: 700;
    }

    p:nth-child(4) {
        font-weight: 600;
    }

    p:nth-child(5) {
        font-weight: 500;
    }

    p:nth-child(6) {
        font-weight: 400;
    }

    p:nth-child(7) {
        font-weight: 300;
    }

    p:nth-child(8) {
        font-weight: 200;
    }

    p:nth-child(9) {
        font-weight: 100;
    }
}
</style>
