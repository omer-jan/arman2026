<script setup lang="ts">
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
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
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    type PrimaryColor,
    type ThemeSkin,
    useAppearance,
} from '@/composables/useAppearance';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { edit, update } from '@/routes/appearance';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import { watch, ref } from 'vue';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: edit().url,
    },
];

const {
    appearance,
    primaryColor,
    updatePrimaryColor,
    skin,
    updateSkin,
    semiDarkMenu,
} = useAppearance();

// Persist preferences to DB (PATCH) while applying immediately via composable
const form = useForm<{ primary_color: PrimaryColor; theme_mode: 'light' | 'dark' | 'system' }>(
    {
        primary_color: primaryColor.value,
        theme_mode: appearance.value,
    },
);

watch(primaryColor, (next) => {
    form.primary_color = next;
    form.patch(update().url, {
        preserveScroll: true,
    });
});

watch(appearance, (next) => {
    form.theme_mode = next;
    form.patch(update().url, {
        preserveScroll: true,
    });
});

const primaryOptions: ReadonlyArray<{
    value: PrimaryColor;
    label: string;
    swatch: string;
}> = [
    // Curated to reduce similar hues
    { value: 'neutral', label: 'Neutral', swatch: '#171717' },
    { value: 'blue', label: 'Blue', swatch: '#2563eb' },
    { value: 'cyan', label: 'Cyan', swatch: '#0891b2' },
    { value: 'green', label: 'Green', swatch: '#16a34a' },
    { value: 'yellow', label: 'Yellow', swatch: '#ca8a04' },
    { value: 'orange', label: 'Orange', swatch: '#ea580c' },
    { value: 'red', label: 'Red', swatch: '#dc2626' },
    { value: 'purple', label: 'Purple', swatch: '#7c3aed' },
];


const skinOptions: ReadonlyArray<{ value: ThemeSkin; label: string }> = [
    { value: 'default', label: 'Default' },
    { value: 'bordered', label: 'Bordered' },
];

// Removed layout and content width options from UI to enforce sensible defaults

// Preview demo state (purely for showcasing styles)
const previewName = ref('Jane Doe');
const previewEmail = ref('jane@example.com');
const previewError = ref('Please enter a valid email.');
const previewNewsletter = ref(true);
const previewSwitch = ref(false);
const previewActiveTab = ref<'Overview' | 'Billing' | 'Team'>('Overview');
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

                <!-- Two-column layout: controls and live preview -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Left: Appearance controls -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Choose mode, primary color, and component skin.
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Mode</Label>
                                <AppearanceTabs />
                            </div>

                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Primary color</Label>
                                <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    <Button
                                        v-for="option in primaryOptions"
                                        :key="option.value"
                                        :variant="primaryColor === option.value ? 'default' : 'outline'"
                                        class="flex items-center justify-center p-3"
                                        :aria-label="option.label"
                                        @click="updatePrimaryColor(option.value)"
                                    >
                                        <span
                                            class="rounded-full border"
                                            :class="primaryColor === option.value ? 'ring-2 ring-offset-2 ring-primary' : ''"
                                            :style="{ backgroundColor: option.swatch, width: '2.25rem', height: '2.25rem' }"
                                        />
                                    </Button>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <Label class="text-sm font-medium">Skin</Label>
                                <div class="flex flex-wrap gap-2">
                                    <Button
                                        v-for="option in skinOptions"
                                        :key="option.value"
                                        :variant="skin === option.value ? 'default' : 'outline'"
                                        class="px-4"
                                        @click="updateSkin(option.value)"
                                    >
                                        {{ option.label }}
                                    </Button>
                                </div>
                            </div>

                            <div class="flex items-center justify-between rounded-md border p-3">
                                <div class="pr-4">
                                    <p class="text-sm font-medium">Semi-dark menu</p>
                                    <p class="text-xs text-muted-foreground">
                                        Darken the sidebar while keeping content bright.
                                    </p>
                                </div>
                                <Switch v-model="semiDarkMenu" />
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Right: Live preview -->
                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>
                                Components reflect your current selections instantly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="space-y-6">
                            <!-- Tabs -->
                            <div class="flex gap-2">
                                <Button
                                    size="sm"
                                    :variant="previewActiveTab === 'Overview' ? 'default' : 'outline'"
                                    @click="previewActiveTab = 'Overview'"
                                >
                                    Overview
                                </Button>
                                <Button
                                    size="sm"
                                    :variant="previewActiveTab === 'Billing' ? 'default' : 'outline'"
                                    @click="previewActiveTab = 'Billing'"
                                >
                                    Billing
                                </Button>
                                <Button
                                    size="sm"
                                    :variant="previewActiveTab === 'Team' ? 'default' : 'outline'"
                                    @click="previewActiveTab = 'Team'"
                                >
                                    Team
                                </Button>
                            </div>

                            <!-- Form -->
                            <div class="grid gap-4 sm:grid-cols-2">
                                <div class="space-y-2">
                                    <Label class="text-sm font-medium">Name</Label>
                                    <Input v-model="previewName" placeholder="Your name" />
                                </div>
                                <div class="space-y-2">
                                    <Label class="text-sm font-medium">Email</Label>
                                    <Input v-model="previewEmail" aria-invalid="true" placeholder="email@domain.com" />
                                    <p class="text-xs text-destructive">{{ previewError }}</p>
                                </div>
                            </div>

                            <!-- Controls -->
                            <div class="flex flex-wrap items-center gap-4">
                                <label class="flex items-center gap-2">
                                    <Checkbox v-model:checked="previewNewsletter" />
                                    <span class="text-sm">Subscribe to newsletter</span>
                                </label>
                                <label class="flex items-center gap-2">
                                    <Switch v-model:checked="previewSwitch" />
                                    <span class="text-sm">Enable feature</span>
                                </label>
                            </div>

                            <!-- Actions -->
                            <div class="flex gap-3">
                                <Button>Primary Button</Button>
                                <Button variant="outline">Outline Button</Button>
                            </div>

                            <!-- Table -->
                            <div class="rounded-md border">
                                <table class="w-full preview-table text-sm">
                                    <thead>
                                        <tr>
                                            <th class="text-left">Name</th>
                                            <th class="text-left">Status</th>
                                            <th class="text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Project Alpha</td>
                                            <td>
                                                <span class="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-primary">Active</span>
                                            </td>
                                            <td><a href="#" class="text-primary hover:underline">View</a></td>
                                        </tr>
                                        <tr>
                                            <td>Project Beta</td>
                                            <td>
                                                <span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5">Paused</span>
                                            </td>
                                            <td><a href="#" class="text-primary hover:underline">View</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>

<style scoped>
/* Simple table styling consistent with tokens */
.preview-table th,
.preview-table td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border);
}
.preview-table thead th {
    background: var(--muted);
}
</style>
