<template>
    <Card>
        <div class="container">
            <div class="header">
                <div class="header-top">
                    <div class="header-title">
                        <NuxtImg src="images/UTK.jpeg" width="50" style="border-radius: var(--border-radius-md);"/>
                        <h3>University of Tennessee - Knoxville</h3>
                    </div>
                    <p class="text-secondary">August 2020 - May 2025</p>
                </div>
                <p class="text-secondary">3.8/4.0 | Summa Cum Laude | Volunteer Merit</p>
            </div>

            <div class="body">
                <h4>Notable Courses:</h4>
                <ul style="padding-left: var(--spacing-md);">
                    <li>Computer Graphics</li>
                    <li>Operating Systems</li>
                    <li>Compilers</li>
                    <li>Systems Programming</li>
                    <li>Biologically Inspired Computing</li>
                    <li>Computer Organization</li>
                </ul>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '../ui/Card.vue';


</script>

<style lang="css" scoped>
    .container {
        min-width: 800px;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .header {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .header-title {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .header-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .text-secondary {
        color: var(--foreground-secondary);
    }
</style>