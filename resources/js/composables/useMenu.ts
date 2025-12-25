import { ref, computed, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import * as Icons from 'lucide-vue-next'
import { menu as rawMenu, type MenuItem } from '@/lib/menu'

export interface MenuStateItem extends MenuItem {
  matched?: boolean
}

function normalizeMenu(items: MenuItem[]): MenuStateItem[] {
  return items.map((it) => ({
    ...it,
    children: it.children ? normalizeMenu(it.children) : undefined,
    matched: false,
  }))
}

const menuTree = ref<MenuStateItem[]>(normalizeMenu(rawMenu))
const searchQuery = ref('')
const expandedKeys = ref<Set<string>>(new Set())

const page = usePage()

function getPathByPredicate(predicate: (item: MenuStateItem) => boolean): MenuStateItem[] | null {
  const path: MenuStateItem[] = []
  function dfs(nodes: MenuStateItem[]): boolean {
    for (const node of nodes) {
      path.push(node)
      if (predicate(node)) return true
      if (node.children && dfs(node.children)) return true
      path.pop()
    }
    return false
  }
  return dfs(menuTree.value) ? [...path] : null
}

function getItemByHref(href: string | null): MenuStateItem | null {
  if (!href) return null
  const foundPath = getPathByPredicate((n) => n.href === href)
  return foundPath ? foundPath[foundPath.length - 1] : null
}

const currentHref = computed(() => {
  // usePage().url includes query; strip query for matching
  const url = page.url || ''
  const qIndex = url.indexOf('?')
  return qIndex >= 0 ? url.slice(0, qIndex) : url
})

const activePath = computed(() => getPathByPredicate((n) => n.href === currentHref.value) || [])

const breadcrumbs = computed(() => {
  return activePath.value.map((n) => ({ title: n.title, href: n.href || '#' }))
})

function setExpandedByPath(path: MenuStateItem[]) {
  const keys = new Set<string>()
  for (const node of path.slice(0, -1)) {
    keys.add(node.key)
  }
  expandedKeys.value = keys
}

// initialize expanded based on active route
setExpandedByPath(activePath.value)

// keep parents open when route changes
watch(currentHref, () => {
  setExpandedByPath(activePath.value)
})

// search matching + auto expand
watch(searchQuery, (q) => {
  const query = q.trim().toLowerCase()
  const keysToExpand = new Set<string>()

  function mark(nodes: MenuStateItem[], ancestors: string[] = []) {
    for (const node of nodes) {
      const isMatch = query.length > 0 && node.title.toLowerCase().includes(query)
      node.matched = !!isMatch
      if (isMatch) {
        for (const k of ancestors) keysToExpand.add(k)
        if (node.children) keysToExpand.add(node.key)
      }
      if (node.children) mark(node.children, [...ancestors, node.key])
    }
  }

  // reset matched flags first
  function reset(nodes: MenuStateItem[]) {
    for (const node of nodes) {
      node.matched = false
      if (node.children) reset(node.children)
    }
  }
  reset(menuTree.value)

  if (query.length === 0) {
    setExpandedByPath(activePath.value)
    return
  }

  mark(menuTree.value)
  // also expand active ancestors
  for (const node of activePath.value.slice(0, -1)) keysToExpand.add(node.key)
  expandedKeys.value = keysToExpand
})

function toggleExpand(key: string) {
  const set = new Set(expandedKeys.value)
  if (set.has(key)) set.delete(key)
  else set.add(key)
  expandedKeys.value = set
}

function isExpanded(key: string) {
  return expandedKeys.value.has(key)
}

function isActive(item: MenuStateItem) {
  return !!item.href && item.href === currentHref.value
}

function iconByName(name?: string) {
  if (!name) return null
  // lucide-vue-next exports PascalCase icon components
  return (Icons as Record<string, any>)[name] || null
}

export function useMenu() {
  return {
    menuTree,
    searchQuery,
    expandedKeys,
    breadcrumbs,
    toggleExpand,
    isExpanded,
    isActive,
    iconByName,
  }
}
