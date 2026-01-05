<template>
    <div class="container">
        <p class="title">Reagan Austin</p>
        <p class="subtitle">r.alex.austinfam@gmail.com</p>
        <div class="icon-container">
            <NuxtLink href="https://github.com/raustin9" target="_blank">
                <i class="pi pi-github header-icon github"></i>
            </NuxtLink>
            <NuxtLink href="https://www.linkedin.com/in/ralexaustin9/" target="_blank">
                <i class="pi pi-linkedin header-icon linkedin"></i>
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }
    
    .icon-container {
        margin-top: var(--spacing-xs);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .header-icon {
        font-size: 1.75rem;
    }

    .linkedin {
        color: var(--colors-linkedin-blue);
    }

    .github {
        color: var(--colors-github-green);
    }

    .title {
        font-size: var(--font-md);
        font-weight: 500;
    }
    .subtitle {
        font-size: var(--font-xs);
    }
</style>