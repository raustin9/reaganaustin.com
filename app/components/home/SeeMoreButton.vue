<template>
    <NuxtLink class="link" :to="destination">
        See More <i class="pi pi-angle-right" style="font-size: 1rem;"></i>
    </NuxtLink>
</template>

<script setup lang="ts">
    interface SeeMoreButtonProps {
        destination: string
    }

    const props = defineProps<SeeMoreButtonProps>()
</script>

<style lang="css" scoped>
    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        text-decoration: none;
        color: var(--foreground-primary);
        background-color: var(--background-secondary);
        padding: var(--spacing-md);
        border-radius: var(--border-radius-md);
        opacity: 0.8;
    }

    .link:hover {
        opacity: 1;
        transition: 100ms ease;
    }
</style>