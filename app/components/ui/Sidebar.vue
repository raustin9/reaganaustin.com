<template>
    <aside class="sidebar">
        <nav class="sidebar-nav">
            <div class="sidebar-header">
                <component v-if="header !== undefined" :is="header"></component>
            </div>
            <div v-if="header" class="header-divider"/>
            <NuxtLink v-for="routeItem in routes" :to="routeItem.path" class="sidebar-link">
                <span v-if="routeItem.icon" class="sidebar-icon">
                    <i :class="routeItem.icon"></i>
                </span>
                <span class="sidebar-label">
                    {{ routeItem.name }}
                </span>
            </NuxtLink>
        </nav>
    </aside>
</template>

<script setup lang="ts">
    import { useRoute } from 'nuxt/app'
    import type { Component } from 'vue'

    interface SidebarRoute {
        path: string
        name: string
        icon?: string
        children?: SidebarRoute[]
    }

    interface SidebarProps {
        routes: SidebarRoute[]
        header?: Component
    }
    
    const props = defineProps<SidebarProps>()

    const route = useRoute()

    const isActive = (path: string): boolean => 
    {
        console.log(`Path: ${path}. RoutePath: ${route.path}`)
        return path === route.path || route.path.startsWith(path + '/')
    }
</script>

<style lang="css" scoped>
    .sidebar {
        min-width: 250px;
        height: 100vh;
        color: var(--foreground-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
        left: 0;
    }

    .sidebar-header-icon {
        font-size: 1.5rem;
    }

    .sidebar-icon {
        font-size: var(--font-sm);
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.75;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .header-divider {
        height: 1px;
        width: 90%;
        background-color: var(--background-secondary);
    }

    .sidebar-header {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 10px;
        margin-bottom: 1rem;
    }

    .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        
        align-items: center;
        border-radius: var(--border-radius-lg);

        box-shadow: 0px 8px 25px -10px var(--shadow-primary);

        background-image: linear-gradient(var(--colors-gray-900), var(--colors-gray-800));

        height: calc(100vh - 20px);
        width: calc(100% - 20px);
    }

    .sidebar-link {
        position: relative;
        color: var(--foreground-primary);
        text-decoration: none;
        width: 90%;
        
        display: flex;
        justify-content: flex-start;
        align-items: center;

        font-family: var(--font-family-primary);
        font-size: var(--font-sm);

        padding: 2% 0 2% 0;
        padding-left: 45px;
        
        border-radius: var(--border-radius-sm);
        transition: 150ms ease;
    }

    .sidebar-label {
        /* border: 1px solid green; */
        width: 45%;
    }

    .sidebar-link:hover {
        transition: 150ms ease;
        background-color: var(--background-secondary);
    }
</style>