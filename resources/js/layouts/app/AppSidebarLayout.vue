<script setup lang="ts">
import AppContent from '@/components/AppContent.vue'
import AppShell from '@/components/AppShell.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppSidebarHeader from '@/components/AppSidebarHeader.vue'
import type { BreadcrumbItemType } from '@/types'
import { computed } from 'vue'
import { useDirection } from '@/composables/useDirection'
import { useHeaderTheme } from '@/composables/useHeaderTheme'

interface Props {
    breadcrumbs?: BreadcrumbItemType[]
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
})

const { direction } = useDirection()
const { headerClass } = useHeaderTheme()
const sidebarSide = computed(() =>
    direction.value === 'rtl' ? 'right' : 'left'
)
</script>

<template>
    <AppShell variant="sidebar">
        <AppSidebar :side="sidebarSide" />

        <AppContent
            variant="sidebar"
            class="h-screen overflow-hidden"
        >
            <!-- Sticky header -->
            <AppSidebarHeader
                :breadcrumbs="breadcrumbs"
                :class="[
          'sticky top-0 z-40 backdrop-blur',
          headerClass,
        ]"

            />

            <!-- Scrollable main content -->
            <div class="flex-1 overflow-y-auto p-4">
                <slot />
            </div>
        </AppContent>
    </AppShell>
</template>
