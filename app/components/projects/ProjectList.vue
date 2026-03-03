<template>
    <div :class="vertical === true ? 'vertical' : 'horizontal'">
        <div 
            v-for="(project, index) in projects" 
            :style="vertical === false ? 'max-width: 32%;' : undefined"
        >
            <ProjectItem 
                v-if="!max || (max && index < max)"
                :url="project.url" 
                :name="project.name" 
                :description="project.description" 
                :icon="project.icon" 
                :tags="project.tags"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Project } from '~/core/Projects';
    import ProjectItem from './ProjectItem.vue'
    
    interface ProjectListProps {
        projects: Project[]
        vertical?: boolean 
        max?: number
    }

    const props = withDefaults(defineProps<ProjectListProps>(), {
        vertical: true
    })
</script>

<style lang="css" scoped>
    .vertical {
        display: flex;
        gap: var(--spacing-sm);
        flex-direction: column;
    }

    .horizontal {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
    }
</style>