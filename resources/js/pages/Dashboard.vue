<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import  { Switch } from'@/components/ui/switch';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"
        >
            <div
                class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"
            >
                <PlaceholderPattern class="absolute inset-0 h-full w-full rounded-xl bg-sidebar-bg/50" />
                <div class="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-4">
                    <h1 class="text-2xl font-semibold text-sidebar-foreground">
                          {{ t('dashboard.welcome') }}
                    </h1>
                    <p class="text-center text-sidebar-foreground/70">
                        {{ t('dashboard.description') }}
                    </p>
                </div>

            </div>
        </div>
    </AppLayout>
</template>
