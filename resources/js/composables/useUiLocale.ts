import { ref, watch } from 'vue'
import { i18n } from '@/plugins/i18n'

export type UiLocale = 'en' | 'prs' | 'ps'

const LOCAL_STORAGE_KEY = 'user-locale'

// Initialize locale from localStorage or default to 'en'
const savedLocale = localStorage.getItem(LOCAL_STORAGE_KEY) as UiLocale | null
export const uiLocale = ref<UiLocale>(savedLocale ?? 'en')

export function setUiLocale(locale: UiLocale) {
  uiLocale.value = locale
  localStorage.setItem(LOCAL_STORAGE_KEY, locale);
  // Update vue-i18n locale, cast to any to avoid TS error
  (i18n.global.locale as any).value = locale;
}

watch(uiLocale, (lang) => {
  document.documentElement.dir = lang === 'prs' || lang === 'ps' ? 'rtl' : 'ltr'
})
