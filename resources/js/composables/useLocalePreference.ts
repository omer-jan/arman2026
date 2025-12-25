import { useStorage } from '@vueuse/core';
import { computed } from 'vue';
import { setUiLocale } from '@/plugins/i18n';

export type TitlePreference = 'en' | 'prs' | 'ps' | 'en+prs';
export type UiLocale = 'en' | 'prs' | 'ps';

export interface DepartmentTitleShape {
    title_en: string;
    title_prs: string;
    title_ps: string | null;
}

const TITLE_STORAGE_KEY = 'department-title-preference';
const UI_LOCALE_STORAGE_KEY = 'ui-locale';

const titlePreference = useStorage<TitlePreference>(TITLE_STORAGE_KEY, 'en+prs');
const uiLocale = useStorage<UiLocale>(UI_LOCALE_STORAGE_KEY, 'en');

export const useLocalePreference = () => {
    const resolveDepartmentTitle = (department: DepartmentTitleShape) => {
        switch (titlePreference.value) {
            case 'en':
                return department.title_en;
            case 'prs':
                return department.title_prs;
            case 'ps':
                return department.title_ps || department.title_prs;
            case 'en+prs':
            default:
                return `${department.title_en} / ${department.title_prs}`;
        }
    };

    const setTitlePreference = (preference: TitlePreference) => {
        titlePreference.value = preference;
    };

    const setUiLanguage = (locale: UiLocale) => {
        uiLocale.value = locale;
        setUiLocale(locale);
    };

    const options: ReadonlyArray<{ value: TitlePreference; label: string }> = [
        { value: 'en', label: 'English only' },
        { value: 'prs', label: 'Dari only' },
        { value: 'ps', label: 'Pashto only' },
        { value: 'en+prs', label: 'English + Dari' },
    ];

    return {
        titlePreference,
        uiLocale,
        titlePreferenceOptions: options,
        resolveDepartmentTitle,
        setTitlePreference,
        setUiLanguage,
        uiLocaleLabel: computed(() => uiLocale.value),
    };
};
