import { ref, watch } from 'vue'
import { i18n } from '@/plugins/i18n'

export type UiLocale = 'en' | 'prs'

export const uiLocale = ref<UiLocale>('en')

export function setUiLocale(locale: UiLocale) {
  uiLocale.value = locale
  i18n.global.locale.value = locale
}

// Optional: update document direction automatically
watch(uiLocale, (lang) => {
  document.documentElement.dir = lang === 'prs' ? 'rtl' : 'ltr'
})
