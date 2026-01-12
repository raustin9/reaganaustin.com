<template>
    <BlogList :blogs="blogs" />
</template>

<script setup lang="ts">
import type { Blog } from '~/core/Blog';
import BlogList from './BlogList.vue';

    const blogs: Blog[] = [
        {
            title: 'Tokenizing 15 million lines of code in one second',
            postedDate: new Date('2026-1-11'),
            url: '/blog/15-million-lines',
            description: 'The techniques and problem solving involved in getting Viper to tokenize at 15 million lines of code per second.',
            contentPath: 'posts/intro.md'
        },
    ]
</script>