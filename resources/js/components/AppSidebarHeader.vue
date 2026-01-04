<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { SidebarTrigger } from '@/components/ui/sidebar'
import type { BreadcrumbItemType } from '@/types'
import { useDirection } from '@/composables/useDirection'
import { router } from '@inertiajs/vue3'
withDefaults(
  defineProps<{ breadcrumbs?: BreadcrumbItemType[] }>(),
  { breadcrumbs: () => [] }
)

const { locale } = useDirection()
function changeLanguage(event: Event) {
  const target = event.target as HTMLSelectElement | null;
  if (!target) return;

  const newLocale = target.value;

  localStorage.setItem('locale', newLocale);
    // backend

  // Hard reload the page to apply changes
    router.post('/language', { locale: newLocale }, {
        preserveScroll: true,
    })
  //window.location.reload();
}
</script>

<template>
  <header
      class="flex h-16 items-center justify-between border-b px-6">
    <div class="flex items-center gap-2">
      <SidebarTrigger />
      <Breadcrumbs v-if="breadcrumbs.length" :breadcrumbs="breadcrumbs" />
    </div>

    <select
      v-model="locale"
      @change="changeLanguage"
      class="border rounded px-2 py-1"
    >
      <option value="en">English</option>
      <option value="ps">پښتو</option>
      <option value="prs">دری</option>
    </select>
  </header>
</template>
