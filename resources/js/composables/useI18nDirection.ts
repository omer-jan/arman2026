import { useTextDirection } from '@vueuse/core'
import { computed, ref } from 'vue'
import { i18n, setUiLocale } from '@/plugins/i18n'

export type LanguageCode = 'en' | 'fa' | 'ar' | 'ja'

export interface LanguageOption {
  value: LanguageCode
  label: string
  dir: 'ltr' | 'rtl'
}

const LANGUAGE_STORAGE_KEY = 'ui-locale'

const stored = typeof window !== 'undefined' ? (localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null) : null
const currentLocale = ref<LanguageCode>(stored || 'en')

// SSR-friendly initial direction
const { dir } = useTextDirection({ initialValue: 'ltr' })

export const languages: ReadonlyArray<LanguageOption> = [
  { value: 'en', label: 'English', dir: 'ltr' },
  { value: 'fa', label: 'Persian', dir: 'rtl' },
  { value: 'ar', label: 'Arabic', dir: 'rtl' },
  { value: 'ja', label: 'Japanese', dir: 'ltr' },
]

const findLang = (code: LanguageCode) => languages.find(l => l.value === code) ?? languages[0]

// Initialize direction based on stored locale
const initial = findLang(currentLocale.value)
dir.value = initial.dir

export const useI18nDirection = () => {
  const changeLanguage = (code: LanguageCode) => {
    const lang = findLang(code)
    currentLocale.value = lang.value
    // update i18n
    setUiLocale(lang.value as any)
    i18n.global.locale.value = lang.value
    // update direction
    dir.value = lang.dir
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang.value)
    }
  }

  const greeting = computed(() => i18n.global.t('hello'))

  return {
    dir,
    currentLocale,
    languages,
    changeLanguage,
    greeting,
  }
}
