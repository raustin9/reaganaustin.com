<template>
    <div class="container" :style="{ 'background-color': color + 'A0', 'border': `1.5px solid ${color}` }">
        <NuxtImg v-if="iconUrl !== undefined && iconUrl !== null" :src="iconUrl" width="18"/>
        <p class="tag-name">
            {{ name }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import type { ProjectTag } from '~/core/Projects';

    const props = defineProps<ProjectTag>()
</script>

<style lang="css" scoped>
    .container {
        padding-bottom: var(--spacing-xs);
        padding-top: var(--spacing-xs);
        padding-left: var(--spacing-sm);
        padding-right: var(--spacing-sm);
        border-radius: var(--border-radius-rounded);

        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        height: 30px;
    }

    .logo {
        border-radius: var(--border-radius--sm);
    }

    .tag-name {
        font-size: var(--font-xs);
    }
</style>