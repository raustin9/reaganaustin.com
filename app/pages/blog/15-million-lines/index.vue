<template>
    <div class="container">
        <ContentRenderer v-if="post" :value="post" class="prose"/>
        <p v-else>Not found</p>
    </div>
</template>

<script setup lang="ts">
    const path = 'posts/intro.md'

    const { data: post } = await useAsyncData(() => queryCollection('content').first())

</script>

<style scoped>
    .container {
        padding-top: var(--spacing-lg);
        padding-left: var(--spacing-lg);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
        width: 100%;
        padding-bottom: 150px;
    }

    .item-container {
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .about-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        width: 75%;
    }

</style>