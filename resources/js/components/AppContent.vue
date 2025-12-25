<script setup lang="ts">
import { SidebarInset } from '@/components/ui/sidebar';
import { useAppearance } from '@/composables/useAppearance';
import { computed } from 'vue';

interface Props {
    variant?: 'floating' | 'sidebar' | 'inset';
    class?: string;
}

const props = defineProps<Props>();
const { contentWidth } = useAppearance();

const containerClass = computed(() => [
    'flex w-full flex-1 flex-col gap-4 rounded-xl',
    contentWidth.value === 'wide'
        ? 'w-full'
        : 'mx-auto max-w-[var(--app-content-max-width)]',
    props.class,
]);
</script>

<template>
    <SidebarInset v-if="props.variant === 'sidebar'" :class="containerClass">
        <slot />
    </SidebarInset>
    <main v-else :class="['h-full', ...containerClass]">
        <slot />
    </main>
</template>
