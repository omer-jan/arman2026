<script setup lang="ts">
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import SidebarVariantTabs from '@/components/SidebarVariantTabs.vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    type ContentWidth,
    type LayoutStyle,
    type PrimaryColor,
    type ThemeSkin,
    useAppearance,
} from '@/composables/useAppearance';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { edit } from '@/routes/appearance';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: edit().url,
    },
];

const {
    primaryColor,
    updatePrimaryColor,
    skin,
    updateSkin,
    semiDarkMenu,
    updateMenuTone,
    layout,
    updateLayout,
    contentWidth,
    updateContentWidth,
} = useAppearance();

const primaryOptions: ReadonlyArray<{
    value: PrimaryColor;
    label: string;
    swatch: string;
}> = [
    { value: 'neutral', label: 'Neutral', swatch: '#171717' },
    { value: 'stone', label: 'Stone', swatch: '#1c1917' },
    { value: 'zinc', label: 'Zinc', swatch: '#18181b' },
    { value: 'slate', label: 'Slate', swatch: '#0f172a' },

    { value: 'indigo', label: 'Indigo', swatch: '#4f46e5' },
    { value: 'blue', label: 'Blue', swatch: '#2563eb' },
    { value: 'cyan', label: 'Cyan', swatch: '#0891b2' },
    { value: 'emerald', label: 'Emerald', swatch: '#059669' },
    { value: 'green', label: 'Green', swatch: '#16a34a' },
    { value: 'lime', label: 'Lime', swatch: '#65a30d' },
    { value: 'yellow', label: 'Yellow', swatch: '#ca8a04' },
    { value: 'orange', label: 'Orange', swatch: '#ea580c' },
    { value: 'red', label: 'Red', swatch: '#dc2626' },
    { value: 'rose', label: 'Rose', swatch: '#e11d48' },
    { value: 'pink', label: 'Pink', swatch: '#db2777' },
    { value: 'purple', label: 'Purple', swatch: '#7c3aed' },
    { value: 'violet', label: 'Violet', swatch: '#8b5cf6' },
];


const skinOptions: ReadonlyArray<{ value: ThemeSkin; label: string }> = [
    { value: 'default', label: 'Default' },
    { value: 'bordered', label: 'Bordered' },
];

const layoutOptions: ReadonlyArray<{
    value: LayoutStyle;
    label: string;
    helper: string;
}> = [
    { value: 'vertical', label: 'Vertical', helper: 'Standard sidebar' },
    { value: 'collapsed', label: 'Collapsed', helper: 'Compact navigation' },
    { value: 'horizontal', label: 'Horizontal', helper: 'Top navigation' },
];

const widthOptions: ReadonlyArray<{
    value: ContentWidth;
    label: string;
    helper: string;
}> = [
    { value: 'compact', label: 'Compact', helper: 'Best for dashboards' },
    { value: 'wide', label: 'Wide', helper: 'Roomier content area' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Appearance settings" />

        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                />

                <div class="grid gap-6 grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme</CardTitle>
                            <CardDescription>
                                Control color mode, primary accent, and component skin.
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Mode</Label>
                                <AppearanceTabs />
                            </div>

                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Primary color</Label>
                                <div class="grid gap-2 sm:grid-cols-2">
                                    <Button
                                        v-for="option in primaryOptions"
                                        :key="option.value"
                                        :variant="primaryColor === option.value ? 'default' : 'outline'"
                                        class="flex items-center justify-between"
                                        @click="updatePrimaryColor(option.value)
                                        "
                                    >
                                        <span class="font-medium">{{ option.label }}</span>
                                        <span class="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span
                                                class="h-6 w-6 rounded-full border"
                                                :style="{ backgroundColor: option.swatch }"
                                            ></span>
                                            shadcn-{{ option.value }}
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div class="grid gap-4 sm:grid-cols-2">
                                <div class="space-y-2">
                                    <Label class="text-sm font-medium">Skin</Label>
                                    <div class="flex flex-wrap gap-2">
                                        <Button
                                            v-for="option in skinOptions"
                                            :key="option.value"
                                            :variant="skin === option.value ? 'default' : 'outline'"
                                            class="w-full justify-center sm:w-auto"
                                            @click="updateSkin(option.value)"
                                        >
                                            {{ option.label }}
                                        </Button>
                                    </div>
                                </div>

                             <div class="flex items-center justify-between">
    <div class="pr-4">
        <p class="text-sm font-medium">Semi-dark menu</p>
        <p class="text-xs text-muted-foreground">
            Darken the sidebar while keeping content bright.
        </p>
    </div>

    <Switch v-model="semiDarkMenu" />
</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Layout</CardTitle>
                            <CardDescription>
                                Tailor navigation density and page width to match your workflow.
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Layout</Label>
                                <div class="grid gap-2 sm:grid-cols-3">
                                    <Button
                                        v-for="option in layoutOptions"
                                        :key="option.value"
                                        :variant="layout === option.value ? 'default' : 'outline'"
                                        class="h-full flex-col items-start justify-start gap-1 text-left"
                                        @click="updateLayout(option.value)"
                                    >
                                        <span class="text-sm font-semibold">{{ option.label }}</span>
                                        <span class="text-xs text-muted-foreground">
                                            {{ option.helper }}
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Sidebar style</Label>
                                <SidebarVariantTabs />
                            </div>

                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Content width</Label>
                                <div class="grid gap-2 sm:grid-cols-2">
                                    <Button
                                        v-for="option in widthOptions"
                                        :key="option.value"
                                        :variant="contentWidth === option.value ? 'default' : 'outline'"
                                        class="flex h-full flex-col items-start gap-1 text-left"
                                        @click="updateContentWidth(option.value)
                                        "
                                    >
                                        <span class="text-sm font-semibold">{{ option.label }}</span>
                                        <span class="text-xs text-muted-foreground">
                                            {{ option.helper }}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
