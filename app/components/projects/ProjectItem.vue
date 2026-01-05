<template>
    <NuxtLink :href="props.url ?? undefined" target="_blank" class="link-container" :class="props.url ? 'link-has-url' : undefined">
        <div class="project-header">
            <i v-if="props.icon" :class="props.icon" class="pi"></i>
            <h3 class="project-title">{{ props.name }}</h3>
        </div>
        <p class="project-description">{{ props.description }}</p>
        <div v-if="tags.length > 0" class="project-tags-container">
            <ProjectTag v-for="tag in tags" :name="tag.name" :color="tag.color" :icon-url="tag.iconUrl"/>
        </div>
    </NuxtLink>
</template>

<style lang="css" scoped>
    .link-container {
        opacity: 0.80;
        background-image: linear-gradient(to bottom right, var(--colors-gray-800), var(--colors-gray-900));
        padding: var(--spacing-md);
        border-radius: var(--border-radius-md);
        color: var(--foreground-primary);
        text-decoration: none;
        display: flex;
        flex-grow: ;
        flex-direction: column;
        gap: var(--spacing-sm);
        height: 100%;
        box-shadow: 0px 8px 25px -10px var(--shadow-primary);
    }

    .link-has-url:hover {
        opacity: 1;
        transition: 100ms ease;
    }

    .project-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .project-title {

    }

    .project-tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
    }
</style>

<script setup lang="ts">
    import type { Project } from '~/core/Projects';
import ProjectTag from './ProjectTag.vue';
    
    const props = defineProps<Project>()
</script>