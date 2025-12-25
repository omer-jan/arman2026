<script setup lang="ts">
import AppSidebarLayout from '@/layouts/app/AppSidebarLayout.vue'
import { Head } from '@inertiajs/vue3'
import { useMenu } from '@/composables/useMenu'

const { breadcrumbs } = useMenu()
</script>

<template>
  <Head title="Leave Report" />
  <AppSidebarLayout :breadcrumbs="breadcrumbs">
    <div class="p-4">
      <h1 class="text-xl font-semibold">Welcome to Leave Report</h1>
      <p class="text-muted-foreground">HR → Reports → Leave Report</p>
    </div>
  </AppSidebarLayout>
</template>
