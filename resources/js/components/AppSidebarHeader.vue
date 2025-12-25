<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppearance } from '@/composables/useAppearance';
import { getInitials } from '@/composables/useInitials';
import type { BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/vue3';
import { Bell, ChevronsUpDown, Moon, Sun } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useI18nDirection } from '@/composables/useI18nDirection';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'reka-ui';

interface NotificationItem {
    id: number;
    title: string;
    body: string;
    time: string;
    unread?: boolean;
}

withDefaults(
    defineProps<{
        breadcrumbs?: BreadcrumbItemType[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);

const page = usePage();
const user = computed(() => page.props.auth.user);

const notifications = ref<NotificationItem[]>([
    {
        id: 1,
        title: 'New order',
        body: 'Order #482 has been paid and is ready for review.',
        time: '2m ago',
        unread: true,
    },
    {
        id: 2,
        title: 'Server maintenance',
        body: 'We will update nodes tonight at 01:00 UTC.',
        time: '1h ago',
        unread: true,
    },
    {
        id: 3,
        title: 'Weekly report',
        body: 'Your performance metrics are ready to view.',
        time: 'Yesterday',
    },
]);

const unreadCount = computed(() =>
    notifications.value.filter((item) => item.unread).length,
);

const { resolvedAppearance, updateAppearance } = useAppearance();
const isDark = computed(() => resolvedAppearance.value === 'dark');

const toggleTheme = () => {
    updateAppearance(isDark.value ? 'light' : 'dark');
};

const themeIcon = computed(() => (isDark.value ? Sun : Moon));
const themeLabel = computed(() =>
    isDark.value ? 'Switch to light mode' : 'Switch to dark mode',
);

// Language + direction management
const { currentLocale, languages, changeLanguage, dir, greeting } = useI18nDirection();
</script>

<template>
    <header
        class="flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
    >
        <div class="flex flex-1 items-center gap-3 overflow-hidden">
            <SidebarTrigger class="-ml-1" />
            <template v-if="breadcrumbs && breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </template>
        </div>

        <div class="flex items-center gap-2">
            <!-- Language selector -->
            <div class="hidden sm:block">
                <Select :value="currentLocale" @update:value="changeLanguage">
                    <SelectTrigger aria-label="Select language" class="w-36">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="lang in languages" :key="lang.value" :value="lang.value">
                            <span class="flex w-full items-center justify-between">
                                <span>{{ lang.label }}</span>
                                <Badge variant="outline" class="ml-2">{{ lang.dir.toUpperCase() }}</Badge>
                            </span>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- Current direction indicator -->
            <Badge variant="outline" class="hidden sm:inline-flex">{{ dir }}</Badge>
            <span class="hidden sm:inline text-sm text-muted-foreground">{{ greeting }}</span>

            <Tooltip :delay-duration="0">
                <TooltipTrigger as-child>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="h-9 w-9"
                        :aria-label="themeLabel"
                        @click="toggleTheme"
                    >
                        <component :is="themeIcon" class="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{{ themeLabel }}</p>
                </TooltipContent>
            </Tooltip>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="relative h-9 w-9"
                        aria-label="Notifications"
                    >
                        <Bell class="h-5 w-5" />
                        <Badge
                            v-if="unreadCount"
                            class="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full px-1 text-[11px]"
                        >
                            {{ unreadCount }}
                        </Badge>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-80">
                    <DropdownMenuLabel class="flex items-center justify-between">
                        <span>Notifications</span>
                        <span class="text-xs text-muted-foreground">
                            {{ unreadCount }} unread
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup v-if="notifications.length">
                        <DropdownMenuItem
                            v-for="item in notifications"
                            :key="item.id"
                            class="flex items-start gap-2 py-3"
                        >
                            <div
                                class="mt-0.5 h-2 w-2 rounded-full"
                                :class="item.unread ? 'bg-primary' : 'bg-muted'
                                "
                            ></div>
                            <div class="flex flex-1 flex-col gap-1">
                                <div class="flex items-center justify-between gap-2">
                                    <p class="text-sm font-medium leading-none">
                                        {{ item.title }}
                                    </p>
                                    <span
                                        class="text-xs font-medium text-muted-foreground"
                                    >
                                        {{ item.time }}
                                    </span>
                                </div>
                                <p class="text-sm text-muted-foreground">
                                    {{ item.body }}
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem v-else class="text-muted-foreground">
                        All caught up
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button
                        variant="ghost"
                        class="flex items-center gap-3 px-2"
                        aria-label="User menu"
                    >
                        <Avatar class="h-9 w-9">
                            <AvatarImage
                                v-if="user?.avatar"
                                :src="user.avatar"
                                :alt="user.name"
                            />
                            <AvatarFallback
                                class="rounded-full bg-muted font-semibold text-foreground"
                            >
                                {{ getInitials(user?.name) }}
                            </AvatarFallback>
                        </Avatar>
                        <div class="hidden flex-col text-left leading-tight md:flex">
                            <span class="text-sm font-semibold">
                                {{ user?.name }}
                            </span>
                            <span class="text-xs text-muted-foreground">
                                {{ user?.email }}
                            </span>
                        </div>
                        <ChevronsUpDown class="ml-1 hidden h-4 w-4 text-muted-foreground md:block" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-64">
                    <UserMenuContent :user="user" />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
</template>
