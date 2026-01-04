import { ref, computed } from 'vue'
import { headerThemes, type HeaderTheme } from '@/config/headerThemes'

const activeTheme = ref<HeaderTheme>('') // 👈 change here

export function useHeaderTheme() {
const headerClass = computed(() => headerThemes[activeTheme.value])

return {
activeTheme,
headerClass,
}
}
