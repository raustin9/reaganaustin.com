<template>
    <div class="card-container">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="css" scoped>
    .card-container {
        border-radius: var(--border-radius-lg);
        box-shadow: 0px 8px 25px -10px var(--shadow-primary);
        background-image: linear-gradient(to bottom right, var(--colors-gray-800), var(--colors-gray-900));
        padding: var(--spacing-md);
        gap: var(--spacing-sm);
        display: flex;
        flex-direction: column;
    }
</style>