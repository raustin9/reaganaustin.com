<template>
    <Sidebar :routes="routes" :header="AppSidebarHeader"></Sidebar>
</template>

<script setup lang="ts">
    import AppSidebarHeader from './AppSidebarHeader.vue';
import Sidebar from './ui/Sidebar.vue';
    const routes = [
        { path: '/', name: 'home', icon: 'pi pi-home' },
        { path: '/about', name: 'about', icon: 'pi pi-user' },
        { path: '/experience', name: 'experience', icon: 'pi pi-clipboard' },
        { path: '/projects', name: 'projects', icon: 'pi pi-code' },
    ]
</script>