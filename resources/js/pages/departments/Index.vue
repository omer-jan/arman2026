<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { useLocalePreference, type TitlePreference } from '@/composables/useLocalePreference';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface Department {
    id: number;
    code: string;
    title_en: string;
    title_prs: string;
    title_ps: string | null;
    manager_id: number | null;
    status: 'active' | 'deactive';
    created_at: string | null;
    updated_at: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedDepartments {
    data: Department[];
    meta: {
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };
}

interface Props {
    departments: PaginatedDepartments;
    filters: Record<string, string | null>;
    departmentOptions: Department[];
}

const props = defineProps<Props>();
const { t } = useI18n();
const { titlePreference, titlePreferenceOptions, resolveDepartmentTitle, setTitlePreference, setUiLanguage, uiLocale } =
    useLocalePreference();

const defaultSort = 'created_at';
const defaultDirection = 'desc';

const search = reactive({
    code: props.filters.code ?? '',
    title_en: props.filters.title_en ?? '',
    title_prs: props.filters.title_prs ?? '',
    title_ps: props.filters.title_ps ?? '',
    status: props.filters.status ?? '',
    sort: props.filters.sort ?? defaultSort,
    direction: props.filters.direction ?? defaultDirection,
});

const createDialogOpen = ref(false);
const editDialogOpen = ref(false);
const editingDepartment = ref<Department | null>(null);
const viewDialogOpen = ref(false);
const viewedDepartment = ref<Department | null>(null);

const createForm = useForm({
    code: '',
    title_en: '',
    title_prs: '',
    title_ps: '',
    manager_id: null as number | null,
});

const updateForm = useForm({
    code: '',
    title_en: '',
    title_prs: '',
    title_ps: '',
    manager_id: null as number | null,
    status: 'active',
});

const isSearching = computed(() =>
    Boolean(search.code || search.title_en || search.title_prs || search.title_ps || search.status) ||
    search.sort !== defaultSort ||
    search.direction !== defaultDirection,
);

const submitSearch = () => {
    router.get('/departments', search, {
        preserveState: true,
        preserveScroll: true,
    });
};

const clearSearch = () => {
    search.code = '';
    search.title_en = '';
    search.title_prs = '';
    search.title_ps = '';
    search.status = '';
    search.sort = defaultSort;
    search.direction = defaultDirection;
    submitSearch();
};

const openCreate = () => {
    createDialogOpen.value = true;
};

const closeCreate = () => {
    createDialogOpen.value = false;
    createForm.reset();
    createForm.clearErrors();
};

const submitCreate = () => {
    createForm.post('/departments', {
        preserveScroll: true,
        onSuccess: () => {
            closeCreate();
        },
    });
};

const openEdit = (department: Department) => {
    editingDepartment.value = department;
    updateForm.code = department.code;
    updateForm.title_en = department.title_en;
    updateForm.title_prs = department.title_prs;
    updateForm.title_ps = department.title_ps ?? '';
    updateForm.manager_id = department.manager_id ?? null;
    updateForm.status = department.status;
    editDialogOpen.value = true;
};

const closeEdit = () => {
    editingDepartment.value = null;
    editDialogOpen.value = false;
    updateForm.clearErrors();
};

const submitUpdate = () => {
    if (!editingDepartment.value) return;

    updateForm.put(`/departments/${editingDepartment.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            closeEdit();
        },
    });
};

const destroyDepartment = (department: Department) => {
    if (!confirm('Delete this department?')) return;

    router.delete(`/departments/${department.id}`, {
        preserveScroll: true,
    });
};

const openView = (department: Department) => {
    viewedDepartment.value = department;
    viewDialogOpen.value = true;
};

const closeView = () => {
    viewedDepartment.value = null;
    viewDialogOpen.value = false;
};

const statusBadgeVariant = (status: Department['status']) =>
    status === 'active' ? 'default' : 'secondary';
</script>

<template>
    <AppLayout>
        <Head :title="t('pages.departments.heading')" />

        <div class="flex flex-col gap-6">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">
                        {{ t('pages.departments.heading') }}
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        {{ t('pages.departments.description') }}
                    </p>
                </div>

                <div class="flex items-center gap-3">
                    <select
                        class="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        :value="uiLocale"
                        @change="(event) => setUiLanguage((event.target as HTMLSelectElement).value as any)"
                    >
                        <option value="en">English UI</option>
                        <option value="prs">Dari UI</option>
                        <option value="ps">Pashto UI</option>
                    </select>

                    <select
                        class="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        :value="titlePreference"
                        @change="(event) => setTitlePreference((event.target as HTMLSelectElement).value as TitlePreference)"
                    >
                        <option
                            v-for="option in titlePreferenceOptions"
                            :key="option.value"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>

                    <Button variant="outline" @click="openCreate">
                        {{ t('common.addNew') }}
                    </Button>
                    <Button variant="ghost">
                        {{ t('common.download') }}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader class="pb-2">
                    <CardTitle>{{ t('pages.departments.searchTitle') }}</CardTitle>
                    <CardDescription>Search by code or titles.</CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div class="space-y-2">
                            <Label for="code">{{ t('common.code') }}</Label>
                            <Input id="code" v-model="search.code" placeholder="IT" />
                        </div>
                        <div class="space-y-2">
                            <Label for="title_en">{{ t('common.titleEn') }}</Label>
                            <Input id="title_en" v-model="search.title_en" placeholder="English title" />
                        </div>
                        <div class="space-y-2">
                            <Label for="title_prs">{{ t('common.titlePrs') }}</Label>
                            <Input id="title_prs" v-model="search.title_prs" placeholder="Dari title" />
                        </div>
                        <div class="space-y-2">
                            <Label for="title_ps">{{ t('common.titlePs') }}</Label>
                            <Input id="title_ps" v-model="search.title_ps" placeholder="Pashto title" />
                        </div>
                        <div class="space-y-2">
                            <Label for="status">{{ t('common.status') }}</Label>
                            <select
                                id="status"
                                v-model="search.status"
                                class="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            >
                                <option value="">All</option>
                                <option value="active">{{ t('common.active') }}</option>
                                <option value="deactive">{{ t('common.deactive') }}</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <Label for="sort">{{ t('common.sortBy') }}</Label>
                            <select
                                id="sort"
                                v-model="search.sort"
                                class="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            >
                                <option value="created_at">Created date</option>
                                <option value="code">Code</option>
                                <option value="title_en">Title (English)</option>
                                <option value="title_prs">Title (Dari)</option>
                                <option value="title_ps">Title (Pashto)</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <Label for="direction">{{ t('common.direction') }}</Label>
                            <select
                                id="direction"
                                v-model="search.direction"
                                class="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            >
                                <option value="asc">{{ t('common.ascending') }}</option>
                                <option value="desc">{{ t('common.descending') }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button @click="submitSearch">{{ t('common.search') }}</Button>
                        <Button variant="ghost" :disabled="!isSearching" @click="clearSearch">
                            {{ t('common.clear') }}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{{ t('pages.departments.heading') }}</CardTitle>
                    <CardDescription>
                        {{ t('pages.departments.description') }}
                    </CardDescription>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm">
                            <thead>
                                <tr class="border-b text-left text-muted-foreground">
                                    <th class="px-3 py-2 font-medium">{{ t('common.code') }}</th>
                                    <th class="px-3 py-2 font-medium">Titles</th>
                                    <th class="px-3 py-2 font-medium">{{ t('common.status') }}</th>
                                    <th class="px-3 py-2 font-medium text-right">{{ t('common.actions') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="department in props.departments.data" :key="department.id" class="border-b last:border-0">
                                    <td class="px-3 py-2 font-medium">{{ department.code }}</td>
                                    <td class="px-3 py-2">
                                        {{ resolveDepartmentTitle(department) }}
                                        <p class="text-xs text-muted-foreground">
                                            en: {{ department.title_en }} • prs: {{ department.title_prs }} • ps:
                                            {{ department.title_ps ?? department.title_prs }}
                                        </p>
                                    </td>
                                    <td class="px-3 py-2">
                                        <Badge :variant="statusBadgeVariant(department.status)">
                                            {{ department.status === 'active' ? t('common.active') : t('common.deactive') }}
                                        </Badge>
                                    </td>
                                    <td class="px-3 py-2">
                                        <div class="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" @click="openView(department)">
                                                {{ t('common.view') }}
                                            </Button>
                                            <Button variant="ghost" size="sm" @click="openEdit(department)">
                                                {{ t('common.update') }}
                                            </Button>
                                            <Button variant="ghost" size="sm" class="text-destructive" @click="destroyDepartment(department)">
                                                {{ t('common.delete') }}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="!props.departments.data.length">
                                    <td class="px-3 py-4 text-center text-muted-foreground" colspan="4">
                                        {{ t('pages.departments.tableEmpty') }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="flex flex-wrap items-center gap-2">
                        <Link
                            v-for="link in props.departments.meta.links"
                            :key="link.label"
                            :href="link.url || '#'"
                            class="rounded border px-3 py-1 text-sm"
                            :class="link.active ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'
                            "
                            v-html="link.label"
                            preserve-scroll
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

        <Dialog :open="createDialogOpen" @update:open="closeCreate">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{{ t('common.addNew') }}</DialogTitle>
                </DialogHeader>

                <div class="space-y-4 py-2">
                    <div class="space-y-2">
                        <Label for="create-code">{{ t('common.code') }}</Label>
                        <Input id="create-code" v-model="createForm.code" placeholder="IT" />
                        <InputError :message="createForm.errors.code" />
                    </div>
                    <div class="space-y-2">
                        <Label for="create-title-en">{{ t('common.titleEn') }}</Label>
                        <Input id="create-title-en" v-model="createForm.title_en" />
                        <InputError :message="createForm.errors.title_en" />
                    </div>
                    <div class="space-y-2">
                        <Label for="create-title-prs">{{ t('common.titlePrs') }}</Label>
                        <Input id="create-title-prs" v-model="createForm.title_prs" />
                        <InputError :message="createForm.errors.title_prs" />
                    </div>
                    <div class="space-y-2">
                        <Label for="create-title-ps">{{ t('common.titlePs') }}</Label>
                        <Input id="create-title-ps" v-model="createForm.title_ps" />
                        <InputError :message="createForm.errors.title_ps" />
                    </div>
                </div>

                <DialogFooter class="flex items-center justify-end gap-2">
                    <Button variant="ghost" @click="closeCreate">{{ t('common.cancel') }}</Button>
                    <Button :disabled="createForm.processing" @click="submitCreate">{{ t('common.save') }}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog :open="editDialogOpen" @update:open="closeEdit">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{{ t('common.update') }}</DialogTitle>
                </DialogHeader>

                <div class="space-y-4 py-2">
                    <div class="space-y-2">
                        <Label for="edit-code">{{ t('common.code') }}</Label>
                        <Input id="edit-code" v-model="updateForm.code" />
                        <InputError :message="updateForm.errors.code" />
                    </div>
                    <div class="space-y-2">
                        <Label for="edit-title-en">{{ t('common.titleEn') }}</Label>
                        <Input id="edit-title-en" v-model="updateForm.title_en" />
                        <InputError :message="updateForm.errors.title_en" />
                    </div>
                    <div class="space-y-2">
                        <Label for="edit-title-prs">{{ t('common.titlePrs') }}</Label>
                        <Input id="edit-title-prs" v-model="updateForm.title_prs" />
                        <InputError :message="updateForm.errors.title_prs" />
                    </div>
                    <div class="space-y-2">
                        <Label for="edit-title-ps">{{ t('common.titlePs') }}</Label>
                        <Input id="edit-title-ps" v-model="updateForm.title_ps" />
                        <InputError :message="updateForm.errors.title_ps" />
                    </div>
                    <div class="space-y-2">
                        <Label for="edit-status">{{ t('common.status') }}</Label>
                        <select
                            id="edit-status"
                            v-model="updateForm.status"
                            class="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                            <option value="active">{{ t('common.active') }}</option>
                            <option value="deactive">{{ t('common.deactive') }}</option>
                        </select>
                        <InputError :message="updateForm.errors.status" />
                    </div>
                </div>

                <DialogFooter class="flex items-center justify-end gap-2">
                    <Button variant="ghost" @click="closeEdit">{{ t('common.cancel') }}</Button>
                    <Button :disabled="updateForm.processing" @click="submitUpdate">{{ t('common.update') }}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog :open="viewDialogOpen" @update:open="closeView">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Department details</DialogTitle>
                </DialogHeader>

                <div class="space-y-3 py-2">
                    <div>
                        <p class="text-xs uppercase tracking-wide text-muted-foreground">{{ t('common.code') }}</p>
                        <p class="text-sm font-medium text-foreground">{{ viewedDepartment?.code }}</p>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-wide text-muted-foreground">{{ t('common.titleEn') }}</p>
                        <p class="text-sm font-medium text-foreground">{{ viewedDepartment?.title_en }}</p>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-wide text-muted-foreground">{{ t('common.titlePrs') }}</p>
                        <p class="text-sm font-medium text-foreground">{{ viewedDepartment?.title_prs }}</p>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-wide text-muted-foreground">{{ t('common.titlePs') }}</p>
                        <p class="text-sm font-medium text-foreground">
                            {{ viewedDepartment?.title_ps ?? viewedDepartment?.title_prs }}
                        </p>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-wide text-muted-foreground">{{ t('common.status') }}</p>
                        <p class="text-sm font-medium text-foreground">
                            {{ viewedDepartment?.status === 'active' ? t('common.active') : t('common.deactive') }}
                        </p>
                    </div>
                </div>

                <DialogFooter class="flex items-center justify-end gap-2">
                    <Button variant="ghost" @click="closeView">{{ t('common.cancel') }}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
