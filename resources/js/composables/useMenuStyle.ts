import { computed } from 'vue'
import { useAppearance } from '@/composables/useAppearance'

/**
 * Centralized helpers for sidebar menu item styles.
 * Relies on CSS variables applied by useAppearance.
 */
export function useMenuStyle() {
  const { primaryColor, resolvedAppearance } = useAppearance()
  // Touch these to keep reactivity in case variables update
  const _ = computed(() => [primaryColor.value, resolvedAppearance.value])

  const getActiveMenuStyle = () => ({
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--sidebar-primary)',
  } as Record<string, string>)

  const getParentActiveStyle = () => ({
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--sidebar-primary)',
    borderLeft: '2px solid var(--sidebar-primary)',
  } as Record<string, string>)

  const getHoverMenuStyle = () => ({
    // Slight visual emphasis on hover without overriding active state
    // Using the same soft background keeps consistency across modes
    backgroundColor: 'var(--primary-soft)',
  } as Record<string, string>)

  return {
    getActiveMenuStyle,
    getParentActiveStyle,
    getHoverMenuStyle,
  }
}
