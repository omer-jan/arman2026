import { computed, onMounted, ref, watch } from 'vue';

export type Appearance = 'light' | 'dark' | 'system';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type PrimaryColor = 'neutral' | 'stone' | 'zinc' | 'slate' | 'indigo' | 'cyan' | 'emerald' | 'rose'| 'violet' | 'yellow' | 'red' | 'lime' | 'green' | 'blue' | 'purple' | 'pink' | 'orange';
export type ThemeSkin = 'default' | 'bordered';
export type LayoutStyle = 'vertical' | 'collapsed' | 'horizontal';
export type ContentWidth = 'compact' | 'wide';

type ResolvedAppearance = Exclude<Appearance, 'system'>;

interface AppearancePreferences {
    mode: Appearance;
    primaryColor: PrimaryColor;
    skin: ThemeSkin;
    sidebarVariant: SidebarVariant;
    semiDarkMenu: boolean;
    layout: LayoutStyle;
    contentWidth: ContentWidth;
}

type PrimaryTokens = {
    primary: string;
    primaryForeground: string;
    ring: string;
    sidebarPrimary?: string;
    sidebarPrimaryForeground?: string;
};

const PREFERENCES_KEY = 'appearance-preferences';
const LEGACY_APPEARANCE_KEY = 'appearance';
const LEGACY_SIDEBAR_KEY = 'sidebar-variant';

const defaultPreferences: AppearancePreferences = {
    mode: 'system',
    primaryColor: 'slate',
    skin: 'default',
    sidebarVariant: 'inset',
    semiDarkMenu: false,
    layout: 'vertical',
    contentWidth: 'compact',
};

const primaryPalettes: Record<
    PrimaryColor,
    { light: PrimaryTokens; dark: PrimaryTokens }
> = {
    neutral: {
        light: {
            primary: 'hsl(0 0% 10%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(0 0% 45%)',
            sidebarPrimary: 'hsl(0 0% 10%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(0 0% 92%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(0 0% 60%)',
            sidebarPrimary: 'hsl(0 0% 92%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    stone: {
        light: {
            primary: 'hsl(25 13% 17%)',
            primaryForeground: 'hsl(60 9% 98%)',
            ring: 'hsl(25 12% 42%)',
            sidebarPrimary: 'hsl(25 13% 17%)',
            sidebarPrimaryForeground: 'hsl(60 9% 98%)',
        },
        dark: {
            primary: 'hsl(30 14% 88%)',
            primaryForeground: 'hsl(25 13% 17%)',
            ring: 'hsl(28 12% 68%)',
            sidebarPrimary: 'hsl(30 14% 88%)',
            sidebarPrimaryForeground: 'hsl(25 13% 17%)',
        },
    },

    zinc: {
        light: {
            primary: 'hsl(240 6% 10%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(240 5% 64%)',
            sidebarPrimary: 'hsl(240 6% 10%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(240 5% 93%)',
            primaryForeground: 'hsl(240 6% 10%)',
            ring: 'hsl(240 5% 70%)',
            sidebarPrimary: 'hsl(240 5% 93%)',
            sidebarPrimaryForeground: 'hsl(240 6% 10%)',
        },
    },

    slate: {
        light: {
            primary: 'hsl(222 47% 11%)',
            primaryForeground: 'hsl(210 40% 98%)',
            ring: 'hsl(222 84% 10%)',
            sidebarPrimary: 'hsl(222 47% 11%)',
            sidebarPrimaryForeground: 'hsl(210 40% 98%)',
        },
        dark: {
            primary: 'hsl(217 33% 89%)',
            primaryForeground: 'hsl(222 47% 11%)',
            ring: 'hsl(215 25% 65%)',
            sidebarPrimary: 'hsl(217 33% 89%)',
            sidebarPrimaryForeground: 'hsl(222 47% 11%)',
        },
    },

    indigo: {
        light: {
            primary: 'hsl(243 75% 59%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(243 75% 59%)',
            sidebarPrimary: 'hsl(243 75% 59%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(243 75% 75%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(243 75% 75%)',
            sidebarPrimary: 'hsl(243 75% 75%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    cyan: {
        light: {
            primary: 'hsl(188 94% 42%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(188 94% 42%)',
            sidebarPrimary: 'hsl(188 94% 42%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(188 94% 65%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(188 94% 65%)',
            sidebarPrimary: 'hsl(188 94% 65%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    emerald: {
        light: {
            primary: 'hsl(160 84% 39%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(160 84% 39%)',
            sidebarPrimary: 'hsl(160 84% 39%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(160 84% 65%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(160 84% 65%)',
            sidebarPrimary: 'hsl(160 84% 65%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    rose: {
        light: {
            primary: 'hsl(346 77% 49%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(346 77% 49%)',
            sidebarPrimary: 'hsl(346 77% 49%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(346 77% 70%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(346 77% 70%)',
            sidebarPrimary: 'hsl(346 77% 70%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    violet: {
        light: {
            primary: 'hsl(262 83% 58%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(262 83% 58%)',
            sidebarPrimary: 'hsl(262 83% 58%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(262 83% 75%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(262 83% 75%)',
            sidebarPrimary: 'hsl(262 83% 75%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    yellow: {
        light: {
            primary: 'hsl(45 93% 47%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(45 93% 47%)',
            sidebarPrimary: 'hsl(45 93% 47%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
        dark: {
            primary: 'hsl(45 93% 65%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(45 93% 65%)',
            sidebarPrimary: 'hsl(45 93% 65%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    red: {
        light: {
            primary: 'hsl(0 84% 60%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(0 84% 60%)',
            sidebarPrimary: 'hsl(0 84% 60%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(0 84% 75%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(0 84% 75%)',
            sidebarPrimary: 'hsl(0 84% 75%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    lime: {
        light: {
            primary: 'hsl(84 81% 44%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(84 81% 44%)',
            sidebarPrimary: 'hsl(84 81% 44%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
        dark: {
            primary: 'hsl(84 81% 65%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(84 81% 65%)',
            sidebarPrimary: 'hsl(84 81% 65%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    green: {
        light: {
            primary: 'hsl(142 71% 45%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(142 71% 45%)',
            sidebarPrimary: 'hsl(142 71% 45%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(142 71% 65%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(142 71% 65%)',
            sidebarPrimary: 'hsl(142 71% 65%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    blue: {
        light: {
            primary: 'hsl(217 91% 60%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(217 91% 60%)',
            sidebarPrimary: 'hsl(217 91% 60%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(217 91% 75%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(217 91% 75%)',
            sidebarPrimary: 'hsl(217 91% 75%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    purple: {
        light: {
            primary: 'hsl(271 81% 56%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(271 81% 56%)',
            sidebarPrimary: 'hsl(271 81% 56%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(271 81% 75%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(271 81% 75%)',
            sidebarPrimary: 'hsl(271 81% 75%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    pink: {
        light: {
            primary: 'hsl(330 81% 60%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(330 81% 60%)',
            sidebarPrimary: 'hsl(330 81% 60%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(330 81% 75%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(330 81% 75%)',
            sidebarPrimary: 'hsl(330 81% 75%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },

    orange: {
        light: {
            primary: 'hsl(24 95% 53%)',
            primaryForeground: 'hsl(0 0% 98%)',
            ring: 'hsl(24 95% 53%)',
            sidebarPrimary: 'hsl(24 95% 53%)',
            sidebarPrimaryForeground: 'hsl(0 0% 98%)',
        },
        dark: {
            primary: 'hsl(24 95% 70%)',
            primaryForeground: 'hsl(0 0% 10%)',
            ring: 'hsl(24 95% 70%)',
            sidebarPrimary: 'hsl(24 95% 70%)',
            sidebarPrimaryForeground: 'hsl(0 0% 10%)',
        },
    },
};


const contentWidthMap: Record<ContentWidth, string> = {
    compact: '1200px',
    wide: '100%',
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const getSystemAppearance = (): ResolvedAppearance =>
    mediaQuery()?.matches ? 'dark' : 'light';

const resolveAppearance = (
    preference: Appearance,
    systemAppearance: ResolvedAppearance,
): ResolvedAppearance =>
    preference === 'system' ? systemAppearance : preference;

const readPreferences = (): AppearancePreferences => {
    if (typeof window === 'undefined') {
        return { ...defaultPreferences };
    }

    try {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        if (stored) {
            const parsed = JSON.parse(stored) as Partial<AppearancePreferences>;
            return { ...defaultPreferences, ...parsed };
        }
    } catch (error) {
        console.warn('Unable to read appearance preferences', error);
    }

    const legacyMode = localStorage.getItem(LEGACY_APPEARANCE_KEY) as
        | Appearance
        | null;
    const legacySidebar = localStorage.getItem(LEGACY_SIDEBAR_KEY) as
        | SidebarVariant
        | null;

    return {
        ...defaultPreferences,
        mode: legacyMode || defaultPreferences.mode,
        sidebarVariant: legacySidebar || defaultPreferences.sidebarVariant,
    };
};

const writePreferences = (preferences: AppearancePreferences) => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    localStorage.setItem(LEGACY_APPEARANCE_KEY, preferences.mode);
    localStorage.setItem(LEGACY_SIDEBAR_KEY, preferences.sidebarVariant);
    setCookie('appearance', preferences.mode);
};

const applyPrimaryColor = (
    palette: PrimaryColor,
    resolvedAppearance: ResolvedAppearance,
) => {
    if (typeof document === 'undefined') {
        return;
    }

    const tokens = primaryPalettes[palette][resolvedAppearance];
    const root = document.documentElement;

    root.style.setProperty('--primary', tokens.primary);
    root.style.setProperty('--primary-foreground', tokens.primaryForeground);
    root.style.setProperty('--ring', tokens.ring);
    root.style.setProperty(
        '--sidebar-primary',
        tokens.sidebarPrimary ?? tokens.primary,
    );
    root.style.setProperty(
        '--sidebar-primary-foreground',
        tokens.sidebarPrimaryForeground ?? tokens.primaryForeground,
    );
};

const applyContentWidth = (value: ContentWidth) => {
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;
    root.dataset.contentWidth = value;
    root.style.setProperty('--app-content-max-width', contentWidthMap[value]);
};

const applySkin = (skin: ThemeSkin) => {
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;
    root.dataset.skin = skin;

    if (skin === 'bordered') {
        const isDark = root.classList.contains('dark');

        if (isDark) {
            root.style.setProperty('--card', 'hsl(0 0% 8%)');
            root.style.setProperty('--card-foreground', 'hsl(0 0% 96%)');
            root.style.setProperty('--border', 'hsl(0 0% 24%)');
            root.style.setProperty('--sidebar-border', 'hsl(0 0% 22%)');
        } else {
            root.style.setProperty('--card', 'hsl(0 0% 99%)');
            root.style.setProperty('--card-foreground', 'hsl(0 0% 10%)');
            root.style.setProperty('--border', 'hsl(0 0% 82%)');
            root.style.setProperty('--sidebar-border', 'hsl(0 0% 80%)');
        }
    } else {
        root.style.removeProperty('--card');
        root.style.removeProperty('--card-foreground');
        root.style.removeProperty('--border');
        root.style.removeProperty('--sidebar-border');
    }
};

const applyMenuTone = (semiDark: boolean, mode: ResolvedAppearance) => {
    debugger;
    if (typeof document === 'undefined') {
        return;
    }

    const root = document.documentElement;
    const isLight = mode === 'light';
    root.dataset.menuTone = semiDark && isLight ? 'semi-dark' : 'default';

    // Only apply semi-dark overrides in light mode; in dark mode, keep defaults.
    if (semiDark && isLight) {
        root.style.setProperty('--sidebar-background', 'hsl(230 10% 12%)');
        root.style.setProperty('--sidebar', 'hsl(230 10% 12%)');
        root.style.setProperty('--sidebar-foreground', 'hsl(0 0% 96%)');
        root.style.setProperty('--sidebar-accent', 'hsl(230 10% 18%)');
        root.style.setProperty('--sidebar-accent-foreground', 'hsl(0 0% 96%)');
        root.style.setProperty('--sidebar-border', 'hsl(230 10% 22%)');
    } else {
        root.style.removeProperty('--sidebar-background');
        root.style.removeProperty('--sidebar');
        root.style.removeProperty('--sidebar-foreground');
        root.style.removeProperty('--sidebar-accent');
        root.style.removeProperty('--sidebar-accent-foreground');
        root.style.removeProperty('--sidebar-border');
    }
};

const applyLayout = (layout: LayoutStyle) => {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.dataset.layout = layout;
};

export const updateTheme = (
    value: Appearance,
    systemAppearance?: ResolvedAppearance,
): ResolvedAppearance => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const resolved =
        value === 'system'
            ? systemAppearance ?? getSystemAppearance()
            : value;

    document.documentElement.classList.toggle('dark', resolved === 'dark');
    return resolved;
};

const applyPreferences = (
    preferences: AppearancePreferences,
    systemAppearance: ResolvedAppearance,
) => {
    debugger;
    const resolved = updateTheme(preferences.mode, systemAppearance);

    applyPrimaryColor(preferences.primaryColor, resolved);
    applySkin(preferences.skin);
    applyMenuTone(preferences.semiDarkMenu, resolved);
    applyContentWidth(preferences.contentWidth);
    applyLayout(preferences.layout);

    return resolved;
};

export function initializeTheme() {
    if (typeof window === 'undefined') {
        return;
    }

    const preferences = readPreferences();
    const systemAppearance = getSystemAppearance();

    applyPreferences(preferences, systemAppearance);

    mediaQuery()?.addEventListener('change', () => {
        const nextSystem = getSystemAppearance();
        applyPreferences(readPreferences(), nextSystem);
    });
}

const preferences = ref<AppearancePreferences>(readPreferences());
const systemAppearance = ref<ResolvedAppearance>(getSystemAppearance());

export function useAppearance() {
    onMounted(() => {
        systemAppearance.value = getSystemAppearance();
        applyPreferences(preferences.value, systemAppearance.value);

        mediaQuery()?.addEventListener('change', () => {
            systemAppearance.value = getSystemAppearance();
            applyPreferences(preferences.value, systemAppearance.value);
        });
    });

    watch(
        preferences,
        (next) => {
            applyPreferences(next, systemAppearance.value);
            writePreferences(next);
        },
        { deep: true },
    );

    const appearance = computed<Appearance>({
        get: () => preferences.value.mode,
        set: (value) => {
            preferences.value = { ...preferences.value, mode: value };
        },
    });

    const resolvedAppearance = computed<ResolvedAppearance>(() =>
        resolveAppearance(appearance.value, systemAppearance.value),
    );

    const sidebarVariant = computed<SidebarVariant>({
        get: () => preferences.value.sidebarVariant,
        set: (value) => {
            preferences.value = { ...preferences.value, sidebarVariant: value };
        },
    });

    const primaryColor = computed<PrimaryColor>({
        get: () => preferences.value.primaryColor,
        set: (value) => {
            preferences.value = { ...preferences.value, primaryColor: value };
            applyPrimaryColor(
                value,
                resolveAppearance(appearance.value, systemAppearance.value),
            );
        },
    });

    const skin = computed<ThemeSkin>({
        get: () => preferences.value.skin,
        set: (value) => {
            preferences.value = { ...preferences.value, skin: value };
            applySkin(value);
        },
    });

    const semiDarkMenu = computed<boolean>({
        get: () => preferences.value.semiDarkMenu,
        set: (value) => {
            preferences.value = { ...preferences.value, semiDarkMenu: value };
            const currentResolved = resolveAppearance(
                appearance.value,
                systemAppearance.value,
            );
            applyMenuTone(value, currentResolved);
        },
    });

    const layout = computed<LayoutStyle>({
        get: () => preferences.value.layout,
        set: (value) => {
            preferences.value = { ...preferences.value, layout: value };
            applyLayout(value);
        },
    });

    const contentWidth = computed<ContentWidth>({
        get: () => preferences.value.contentWidth,
        set: (value) => {
            preferences.value = { ...preferences.value, contentWidth: value };
            applyContentWidth(value);
        },
    });

    const updateAppearance = (value: Appearance) => {
        appearance.value = value;
    };

    const updateSidebarVariant = (value: SidebarVariant) => {
        sidebarVariant.value = value;
    };

    const updatePrimaryColor = (value: PrimaryColor) => {
        primaryColor.value = value;
    };

    const updateSkin = (value: ThemeSkin) => {
        skin.value = value;
    };

    const updateMenuTone = (value: boolean) => {
        debugger;
        semiDarkMenu.value = value;
    };

    const updateLayout = (value: LayoutStyle) => {
        layout.value = value;
    };

    const updateContentWidth = (value: ContentWidth) => {
        contentWidth.value = value;
    };

    return {
        appearance,
        resolvedAppearance,
        updateAppearance,
        sidebarVariant,
        updateSidebarVariant,
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
    };
}
