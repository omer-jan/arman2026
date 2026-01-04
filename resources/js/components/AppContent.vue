<script setup lang="ts">
import { SidebarInset } from '@/components/ui/sidebar'

interface Props {
    variant?: 'header' | 'sidebar'
    class?: string
}

const props = defineProps<Props>()
</script>

<template>
    <!-- Sidebar layout -->
    <SidebarInset
        v-if="props.variant === 'sidebar'"
        :class="['flex flex-col h-full', props.class]"
    >
        <slot />
    </SidebarInset>

    <!-- Header-only layout -->
    <main
        v-else
        class="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
        :class="props.class"
    >
        <slot />
    </main>
</template>
