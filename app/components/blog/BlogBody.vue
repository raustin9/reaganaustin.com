<template>
    <ContentRenderer v-if="data" :value="data" />
</template>

<script setup lang="ts">
import type { Blog } from '~/core/Blog';

    interface Props {
        path: string 
    }

    const props = defineProps<Props>()

    const { data } = useAsyncData(() => queryCollection('content').path(props.path).first())
</script>