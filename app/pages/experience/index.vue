<template>
    <div class="container">
        <div class="item-container experience-container">
            <h1>Experience</h1>
            <MyExperience />
        </div>
    </div>
</template>

<script setup lang="ts">
import MyExperience from '~/components/experience/MyExperience.vue';

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
    }

    .item-container {
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .about-container {
        width: 75%;
    }

    .project-container {
        width: 90%;
    }
    
    .experience-container {
        width: 90%;
        padding-bottom: 150px;
    }
</style>