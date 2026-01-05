<template>
    <div :class="vertical ? 'vertical' : 'horizontal'">
        <div
            v-for="(experience, index) in experiences"
            :style="vertical === false ? 'max-width: 32%' : 'max-width: 100%'"
        >
            <ExperienceItem
                v-if="!max || index < max"
                :name="experience.name"
                :description="experience.description"
                :role="experience.role"
                :start-date="experience.startDate"
                :out-url="experience.outUrl"
                :logo-url="experience.logoUrl"
                :location="experience.location"
                :end-date="experience.endDate"
                :tags="experience.tags"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Experience } from '~/core/Experience';
import ExperienceItem from './ExperienceItem.vue';

    interface Props {
        experiences: Experience[]
        vertical?: boolean
        max?: number
    }
    
    const props = withDefaults(defineProps<Props>(), {
        vertical: true
    })
</script>

<style scoped>
    .vertical {
        /* border: 1px solid green; */
        display: flex;
        gap: var(--spacing-sm);
        flex-direction: column;
    }

    .horizontal {
        /* border: 1px solid red; */
        display: flex;
        gap: var(--spacing-md);
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
    }
</style>