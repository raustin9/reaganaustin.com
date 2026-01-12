<template>
    <NuxtLink :href="blog.url" target="_blank" class="link-hoverable">
        <Card class="container">
            <div class="header-container">
                <h3>{{ blog.title }}</h3>
                <p>{{ formatDate(blog.postedDate) }}</p>
            </div>
            <p>
                {{ blog.description }}
            </p>
        </Card>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Blog } from '~/core/Blog';
import { formatDate } from '~/core/Format';
import Card from '../ui/Card.vue';

    interface Props {
        blog: Blog
    }

    const props = defineProps<Props>()
</script>

<style scoped>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .link-hoverable {
        opacity: 0.8;
        min-width: 100%;
        text-decoration: none;
        color: var(--foreground-primary);
    }

    .link-hoverable:hover {
        transition: 100ms ease;
        opacity: 1;
    }
</style>