<template>
    <ExperienceList :experiences="MyExperiences" :vertical="true" :max="max"/>
</template>

<script setup lang="ts">
    import type { Experience } from '~/core/Experience';
    import ExperienceList from './ExperienceList.vue';
    import { AzureDevOpsTag, CppTag, CSharpTag, ExpoTag, GoTag, NestJSTag, NextJSTag, OSPRayTag, PostgreSQLTag, PythonTag, ReactNativeTag, ReactTag, SqlServerTag, SwiftTag, TypescriptTag, VisualStudioTag } from '~/core/Projects';

    interface Props {
        max?: number
    }

    const props = defineProps<Props>()

    const MyExperiences: Experience[] = [
        {
            name: 'Reclaimwell',
            role: 'Director of Engineering',
            description: `Head development on our Mobile App and all other engineering efforts. Manage our enterprise's tools and all integrations.`,
            startDate: new Date('2025-01-02'),
            endDate: undefined,
            logoUrl: '/images/Reclaimwell.png',
            location: 'Knoxville, TN',
            outUrl: 'https://reclaimwell.com',
            tags: [
                SwiftTag,
                NestJSTag,
                PostgreSQLTag,
                ExpoTag,
                ReactNativeTag
            ]
        },
        {
            name: 'University of Tennessee - Knoxville',
            role: 'Undergraduate Research Assistant',
            description: `Did research project in partnership with Intel and Department of Energy on effectiveness of Rendering-as-a-Service technique for large and/or sensitive data applications. Profiled the effectiveness of Intel Tiber hardware and Intel RenderKit.`,
            startDate: new Date('2024-12-02'),
            endDate: new Date('2025-12-31'),
            logoUrl: '/images/UTK.jpeg',
            location: 'Knoxville, TN',
            tags: [
                CppTag,
                PythonTag,
                PostgreSQLTag,
                OSPRayTag
            ]
        },
        {
            name: 'Hack4Impact [Student Org]',
            role: 'Director of Talent Development, Tech Lead',
            description: `Created and taught lecture program on web technologies to 100+ students. Lead and developed projects for non profits in East TN area (United Way, Second Harvest Food Bank, 211 Helpline). Sourced, interviewed, and helped grow organization from 15 to over 100 members in 1 year.`,
            startDate: new Date('2020-08-02'),
            endDate: new Date('2024-12-31'),
            logoUrl: '/images/H4I.png',
            location: 'Knoxville, TN',
            tags: [
                TypescriptTag,
                NextJSTag,
                ReactTag,
                PostgreSQLTag
            ],
            outUrl: 'https://utk.hack4impact.org/'
        },
        {
            name: 'Aveva',
            role: 'Software Engineer Intern',
            description: `Improved test coverage on internal library. Worked with the team to complete features and test the product for a quarterly release. Improved and documented library build system.`,
            startDate: new Date('2024-08-02'),
            endDate: new Date('2024-12-02'),
            logoUrl: '/images/Aveva.png',
            location: 'Knoxville, TN (Hybrid)',
            outUrl: 'https://www.aveva.com/en/',
            tags: [
                CSharpTag,
                AzureDevOpsTag,
                VisualStudioTag,
                SqlServerTag
            ]
        },
        {
            name: 'Clayton Homes',
            role: 'Cybersecurity Intern',
            description: `Built custom integrations between tools via intermediate server (golang) that handled connections. Any service that used webhooks or had API could be integrated easily.`,
            startDate: new Date('2024-05-02'),
            endDate: new Date('2024-08-02'),
            logoUrl: '/images/Clayton.png',
            location: 'Knoxville, TN (Hybrid)',
            tags: [
                GoTag,
                PythonTag
            ]
        },
    ]
</script>