<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Link } from '@inertiajs/vue3'
import { ChevronRight } from 'lucide-vue-next'
import { useMenu, type MenuStateItem } from '@/composables/useMenu'
import { computed } from 'vue'
import { useMenuStyle } from '@/composables/useMenuStyle'

interface Props {
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Platform',
})

const { menuTree, toggleExpand, isExpanded, isActive, iconByName } = useMenu()
const { getActiveMenuStyle, getParentActiveStyle } = useMenuStyle()
const items = computed(() => menuTree.value as MenuStateItem[])
</script>

<template>
  <SidebarGroup class="px-2 py-0">
    <SidebarGroupLabel>{{ label }}</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in items" :key="item.key">
        <SidebarMenuItem>
          <template v-if="item.children && item.children.length">
            <SidebarMenuButton
              :is-active="false"
              :tooltip="item.title"
              as-child
              class="cursor-pointer"
            >
              <div
                class="flex w-full items-center"
                @click="toggleExpand(item.key)"
                :aria-expanded="isExpanded(item.key)"
                :style="item.matched ? getParentActiveStyle() : undefined"
                :class="item.matched ? 'rounded px-1 font-semibold' : ''"
              >
                <component v-if="iconByName(item.icon)" :is="iconByName(item.icon)" />
                <span>{{ item.title }}</span>
                <ChevronRight class="ml-auto transition-transform duration-200" :class="isExpanded(item.key) ? 'rotate-90' : ''" />
              </div>
            </SidebarMenuButton>
            <SidebarMenuSub v-show="isExpanded(item.key)">
              <template v-for="child in (item.children as MenuStateItem[])" :key="child.key">
                <template v-if="child.children && child.children.length">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton as-child class="cursor-pointer">
                      <div
                        class="flex w-full items-center"
                        @click="toggleExpand(child.key)"
                        :aria-expanded="isExpanded(child.key)"
                        :style="child.matched ? getParentActiveStyle() : undefined"
                        :class="child.matched ? 'rounded px-1 font-semibold' : ''"
                      >
                        <span>{{ child.title }}</span>
                        <ChevronRight class="ml-auto transition-transform duration-200" :class="isExpanded(child.key) ? 'rotate-90' : ''" />
                      </div>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSub v-show="isExpanded(child.key)" class="ml-2">
                    <SidebarMenuSubItem v-for="leaf in (child.children as MenuStateItem[])" :key="leaf.key">
                      <SidebarMenuSubButton as-child :is-active="isActive(leaf)" class="cursor-pointer" :style="isActive(leaf) ? getActiveMenuStyle() : undefined">
                        <Link :href="leaf.href || '#'">
                          <span>{{ leaf.title }}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </template>
                <template v-else>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton as-child :is-active="isActive(child)" :style="isActive(child) ? getActiveMenuStyle() : undefined">
                      <Link :href="child.href || '#'">
                        <span>{{ child.title }}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </template>
              </template>
            </SidebarMenuSub>
          </template>
          <template v-else>
            <SidebarMenuButton as-child :is-active="isActive(item)" :style="isActive(item) ? getActiveMenuStyle() : undefined">
              <Link :href="item.href || '#'">
                <component v-if="iconByName(item.icon)" :is="iconByName(item.icon)" />
                <span>{{ item.title }}</span>
              </Link>
            </SidebarMenuButton>
          </template>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
