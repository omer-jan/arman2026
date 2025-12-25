
<script setup lang="ts">
import { Search } from "lucide-vue-next"
import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"
import { useMenu } from '@/composables/useMenu'
import { ref, watch } from 'vue'

const { searchQuery } = useMenu()
const localQuery = ref('')

// keep local input and global query in sync
watch(searchQuery, (q) => { localQuery.value = q })

function onKeyup(e: Event) {
  const target = e.target as HTMLInputElement
  searchQuery.value = target.value
}
</script>
<template>
  <form>
    <SidebarGroup class="py-0">
      <SidebarGroupContent class="relative">
        <Label for="search" class="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          v-model="localQuery"
          @keyup="onKeyup"
          placeholder="Search the menu..."
          class="pl-8"
        />
        <Search class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
</template>
