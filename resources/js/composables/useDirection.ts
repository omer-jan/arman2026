import { ref, watch } from 'vue'
export type Direction = 'ltr' | 'rtl'
const locale = ref(localStorage.getItem('locale') || 'en')
const directionMap: Record<string, Direction> = {
  en: 'ltr',
  prs: 'rtl',
  ps: 'rtl',
}
const direction = ref<Direction>(directionMap[locale.value] || 'ltr')
// Sync localStorage and document direction on locale change
watch(locale, (val) => {
  localStorage.setItem('locale', val)
  direction.value = directionMap[val] || 'ltr'
  document.documentElement.lang = val
  document.documentElement.dir = direction.value
})

// Sync localStorage and document direction on direction change
watch(direction, (val) => {
  localStorage.setItem('direction', val)
  document.documentElement.dir = val
})

export function useDirection() {
  return {
    locale,
    direction,
    setLocale: (val: string) => (locale.value = val),
    setDirection: (val: Direction) => (direction.value = val),
  }
}
