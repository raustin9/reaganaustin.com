<template>
    <NuxtLink :href="outUrl" target="_blank" :class="outUrl ? 'link-hoverable' : 'link'">
        <Card>
            <div class="header">
                <div class="vertical-stack">
                    <div class="horizontal-stack">
                        <NuxtImg :src="logoUrl" class="logo"/>
                        <div style="display: flex; flex-direction: column;">
                            <h4 style="font-weight: 600;">{{ role }}</h4>
                            <h5 class="text-secondary">{{ props.name }}</h5>
                        </div>
                    </div>
                    <h5 class="text-secondary">{{ location }}</h5>
                </div>
                <p class="text-secondary">
                    {{ formatDate(startDate) }} - {{ endDate ? formatDate(endDate) : 'present' }}
                </p>
            </div>
            <p>{{ description }}</p>
            <div class="horizontal-stack">
                <ProjectTag v-for="tag in tags" :name="tag.name" :color="tag.color" :icon-url="tag.iconUrl" />
            </div>
        </Card>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Experience } from '~/core/Experience';
import Card from '../ui/Card.vue'
import { formatDate } from '~/core/Format';
import ProjectTag from '../projects/ProjectTag.vue';

    const props = defineProps<Experience>()
</script>

<style scoped>
    .link {
        min-width: 100%;
        text-decoration: none;
        color: var(--foreground-primary);
        opacity: 0.8;
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

    .logo {
        width: 28px;
        height: 28px;
        border-radius: var(--border-radius-sm);
    }

    .text-secondary {
        color: var(--foreground-secondary);
    }

    .vertical-stack {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .horizontal-stack {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-sm);
        align-items: center;
    }

    .header-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--spacing-sm);
    }
</style>