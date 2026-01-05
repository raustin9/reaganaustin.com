<template>
    <div class="container">
        <div class="item-container">
            <h1>About</h1>
            <div class="about-container">
                <AboutMeSummary />
                <AboutMeDetail />
            </div>
            <h1>Education</h1>
        </div>
        <AboutMeEducation />
    </div>
</template>

<script setup lang="ts">
import AboutMeDetail from '~/components/about/AboutMeDetail.vue';
import AboutMeEducation from '~/components/about/AboutMeEducation.vue';

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