<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppShell from '@/components/AppShell.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import type { BreadcrumbItemType } from '@/types';
import { computed } from 'vue'
import { uiLocale } from '@/composables/useUiLocale'

const isRtl = computed(() => uiLocale.value === 'prs' || uiLocale.value === 'ps')

// dynamically set side based on locale direction
const sidebarSide = computed(() => (isRtl.value ? 'right' : 'left'))
interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}
debugger;

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
//    variant?: 'floating' | 'sidebar' | 'inset';
</script>

<template>
    <AppShell variant="sidebar">
        <AppSidebar  :side="sidebarSide" />
        <AppContent variant="sidebar" class="overflow-x-hidden">
            <AppSidebarHeader :breadcrumbs="breadcrumbs" />
            <slot />
        </AppContent>
    </AppShell>
</template>
