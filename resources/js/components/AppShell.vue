<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAppearance } from '@/composables/useAppearance';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

interface Props {
    variant?: 'header' | 'sidebar';
}

defineProps<Props>();

const page = usePage();
const isOpen = page.props.sidebarOpen;
const { layout } = useAppearance();

const defaultOpen = computed(() =>
    layout.value === 'collapsed' || layout.value === 'horizontal'
        ? false
        : isOpen,
);
</script>

<template>
    <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
        <slot />
    </div>
    <SidebarProvider v-else :default-open="defaultOpen">
        <slot />
    </SidebarProvider>
</template>
