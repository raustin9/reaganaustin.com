<template>
    <button class="container" :disabled="disabled" @on-click="handleClick">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    import { LightTheme } from '../../core/Tokens'
    
    const props = defineProps({
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['on-click'])

    const handleClick = (event: Event) => {
        if (!props.disabled) {
            emit('on-click', event)
        }
    }
</script>

<style scoped>
    .container {
        border-radius: 8;
    }
</style>