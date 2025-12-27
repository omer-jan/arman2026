import { ref, watch } from 'vue'
import { i18n } from '@/plugins/i18n'

export type UiLocale = 'en' | 'prs' | 'ps'

export const uiLocale = ref<UiLocale>('en')

export function setUiLocale(locale: UiLocale) {
  uiLocale.value = locale;
  // Cast to any to avoid TS error, or fix by adding vue-i18n.d.ts
  (i18n.global.locale as any).value = locale;
}

watch(uiLocale, (lang) => {
  document.documentElement.dir = lang === 'prs' || lang === 'ps' ? 'rtl' : 'ltr'
})
