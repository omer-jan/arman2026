import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { i18n } from './plugins/i18n'
import { createApp, h } from 'vue';
import { initializeTheme } from './composables/useAppearance';

// 1. Read locale from localStorage or default to 'en'
const savedLocale = localStorage.getItem('locale') || 'en';

// 2. Define which languages are RTL
const rtlLanguages = ['prs', 'ps'];

// 3. Set HTML lang and dir attributes BEFORE Vue app mounts
document.documentElement.lang = savedLocale;
document.documentElement.dir = rtlLanguages.includes(savedLocale) ? 'rtl' : 'ltr';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(i18n)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
