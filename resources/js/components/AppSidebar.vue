<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/vue3';
import { BookOpen, Folder, LayoutGrid } from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';
import { computed } from 'vue';
// const mainNavItems: NavItem[] = [
//     {
//         title: t('menu.dashboard'),
//         href: dashboard(),
//         icon: LayoutGrid,
//     },
// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: t('menu.github'),
//         href: 'https://github.com/laravel/vue-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: t('menu.documentation'),
//         href: 'https://laravel.com/docs/starter-kits#vue',
//         icon: BookOpen,
//     },
// ];
const mainNavItems = computed(() => [
  {
    title: t('menu.dashboard'),
    href: dashboard(),
    icon: LayoutGrid,
  },
]);

const footerNavItems = computed(() => [
  {
    title: t('menu.github'),
    href: 'https://github.com/laravel/vue-starter-kit',
    icon: Folder,
  },
  {
    title: t('menu.documentation'),
    href: 'https://laravel.com/docs/starter-kits#vue',
    icon: BookOpen,
  },
]);
// Single defineProps() with ALL props
const props = withDefaults(defineProps<{
    side?: 'left' | 'right';
    // ... other props from SidebarProps
}>(), {
    side: 'left', // default value
    // ... other defaults
});


</script>

<template>
    <Sidebar
        :side="props.side"
        collapsible="icon"
        variant="sidebar"
    >
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
