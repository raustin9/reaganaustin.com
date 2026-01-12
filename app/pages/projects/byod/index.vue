<template>
    <div class="container">
        <h1>Bring Your Own Data</h1>
        <div class="content">
            <div class="content-container">
                <p>
                    One of the hardest problems in data visualization is showing data of differing resolutions together.
                    For example, it is hard to understand how survey data that is indexed per-address corresponds to research data that is indexed by zip-code.
                    At my time doing research at UTK, we developed a system that could take data at these different geographic resolutions and render them on top of each other.
                </p>
                <p>
                    Similar to <NuxtLink href="/projects/sunrise" target="_blank">Sunrise</NuxtLink> this was based around a server-client architecture for handling this large data.
                    The idea is that a user could submit their own datasets, and so long as it was keyed geographically, we could render it on the globe.
                </p>
                <p>
                    BYOD was a way to "bring your own data" and interact with it. By using Rendering-as-a-Service techniques, we are able to render very large amounts of this data on
                    distributed systems without worrying about a client machine's capabilities.
                    This means that we can take this data, construct textures and meshes from it, and provide an interactive experience to view their data.
                </p>
            </div>
            <div class="content-container-grid">
                <div class="content-grid-item">
                    <NuxtImg src="images/byod.png" class="image" />
                    <p class="image-subtitle">High resolution (per address) data rendered onto buildings with lowwer resolution area data rendered behind it</p>
                </div>
                <div class="content-grid-item">
                    <NuxtImg src="images/byod.png" class="image" />
                    <p class="image-subtitle">High fidelity Smoky Mountain National Park terrain geometry rendered. To 10-meter scale. Pink coloration is species density data visualized.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    a {
        text-decoration: underline;
        text-underline-offset: 1.5px;
        color: var(--link-primary);
    }

    .image {
        border-radius: var(--border-radius-lg);
        width: 100%;
    }

    .image-subtitle {
        text-align: center;
        color: var(--foreground-secondary);
    }


    .container {
        padding-top: var(--spacing-lg);
        padding-left: var(--spacing-lg);
        padding-right: var(--spacing-lg);
        padding-bottom: 150px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
        width: 100%;
    }

    .content {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .content-grid-item {
        /* border: 1px solid green; */
        width: 100%;
    }

    .content-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        width: 40%;
    }
    
    .content-container-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);
        width: 58%;
        /* border: 1px solid red; */
    }
</style>