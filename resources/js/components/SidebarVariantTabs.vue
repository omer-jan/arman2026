<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';
import type { SidebarVariant } from '@/composables/useAppearance';
import Icon from '@/components/Icon.vue';

const { sidebarVariant, updateSidebarVariant } = useAppearance();

const tabs: ReadonlyArray<{
    value: SidebarVariant;
    label: string;
    icon: string; // Icon.vue expects camelCase that maps to Lucide PascalCase
}> = [
    { value: 'sidebar', label: 'Sidebar', icon: 'panelLeft' },
    { value: 'floating', label: 'Floating', icon: 'layoutGrid' },
    { value: 'inset', label: 'Inset', icon: 'layoutDashboard' },
] as const;
</script>

<template>
    <div
        class="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800"
    >
        <button
            v-for="{ value, label, icon } in tabs"
            :key="value"
            @click="updateSidebarVariant(value)"
            :class="[
                'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                sidebarVariant === value
                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
            ]"
        >
            <Icon :name="icon" class="-ml-1 h-4 w-4" />
            <span class="ml-1.5 text-sm">{{ label }}</span>
        </button>
    </div>
</template>
