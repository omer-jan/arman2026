import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { i18n } from '@/plugins/i18n'
import { initializeTheme, applyServerPreferences } from './composables/useAppearance';

const appName = import.meta.env.VITE_APP_NAME || 'Arman Mis';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        // Apply DB-backed appearance ahead of mount for zero-flash
        // @ts-expect-error: runtime prop from Inertia
        applyServerPreferences(props?.initialPage?.props?.appearance);

        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(i18n)
            .mount(el);
    },
    progress: {
        color: 'var(--primary)',
    },
});

// Ensure theme stays in sync with system changes or local adjustments
initializeTheme();
