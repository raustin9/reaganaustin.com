<template>
    <ProjectList :projects="myProjects" :vertical="vertical" :max="max"/>
</template>

<script lang="ts" setup>
    import { CMakeTag, CppTag, JavascriptTag, OSPRayTag, PythonTag, RustTag, VulkanTag, WebGL2Tag, type Project } from '~/core/Projects';
    import ProjectList from './ProjectList.vue'
    
    const myProjects: Project[] = [
        {
            name: 'Experimental Compiler Toolchain (Viper)',
            description: 'Working on techniques in compiler toolchain for expressing language attributes while maintaining runtime performance.',
            url: 'https://github.com/CurseSoftware/Viper',
            icon: 'pi-wrench',
            tags: [
                CppTag,
                CMakeTag
            ]
        },
        {
            name: 'Game Engine Modules',
            description: 'Library of useful, independent (but compatible) modules for game engine or application development in C++. Tools like windowing, graphics, and mathematics.',
            url: 'https://github.com/CurseSoftware/blade',
            icon: 'pi-box',
            tags: [
                CppTag,
                CMakeTag,
                VulkanTag
            ]
        },
        {
            name: 'Sunrise',
            description: 'Undergraduate research project at UTK in collaboration with Intel and the Department of Energy. Used rendering-as-a-service (RaaS) architecture for real-time, interactive, large-data (2TB+) graphics applications. By tiling client rendering surface, we can send a request to many stateless servers for each tile to receive its rendered portion. Docker swarm was used to manage the server daemons and route requests.',
            url: '/projects/sunrise',
            icon: 'pi-sitemap',
            tags: [
                RustTag,
                PythonTag,
                OSPRayTag
            ]
        },
        {
            name: 'Rendering Hardware Interface',
            description: 'An API layer between user code and a graphics API (Vulkan, DX12). This is being built for use in the Game Engine Modules library.',
            url: 'https://github.com/CurseSoftware/rhi',
            icon: 'pi-share-alt',
            tags: [
                CppTag,
                CMakeTag,
                VulkanTag
            ]
        },
        {
            name: 'Web Graphics Engine',
            description: 'A rendering engine for Javascript using WebGL2. I built this for my computer graphics course to render a complex scene. This supports custom .obj models with textures, lighting, bump and normal maps, object transformations (rotation, translation, scale).',
            url: 'https://github.com/raustin9/Envy-Rendering-Engine',
            icon: 'pi-image',
            tags: [
                JavascriptTag,
                WebGL2Tag
            ]
        },
        {
            name: 'Hopfield Neural Network',
            description: 'A C++ implementation of a Hopfield Neural Net. This was for the Biologically Inspired Computing class at UTK. This uses multithreading to achieve the best perforamnce in the class running in just under 2 seconds. The average was ~30s.',
            url: 'https://github.com/raustin9/Hopfield-Neural-Network',
            icon: 'pi-share-alt',
            tags: [
                CppTag,
                CMakeTag
            ]
        },
    ]

    interface MyProjectsProps {
        vertical?: boolean
        max?: number
    }

    const props = withDefaults(defineProps<MyProjectsProps>(), {
        vertical: false
    })
</script>