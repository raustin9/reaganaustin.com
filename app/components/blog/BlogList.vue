<template>
    <div class="list-container">
        <BlogListItem v-for="blog in blogs" :blog="blog" />
    </div>
</template>

<style scoped>
    .list-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }
</style>

<script setup lang="ts">
import type { Blog } from '~/core/Blog';
import BlogListItem from './BlogListItem.vue';

    interface Props {
        blogs: Blog[]
        max?: number
    }

    const props = defineProps<Props>()

</script>