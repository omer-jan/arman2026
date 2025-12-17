<script setup lang="ts">
import logo from "../../../images/arman.png";
import { home } from '@/routes';
import { Link } from '@inertiajs/vue3';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>
<template>
    <div
        class="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-6"
    >
        <div
            class="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg ring-1 ring-border"
        >

            <div class="flex flex-col items-center gap-4">
                <img
                    :src="logo"
                    alt="App Logo"
                    class="h-28 w-28 object-contain"
                />

                <div class="text-center">
                    <h1 class="text-2xl font-semibold tracking-tight">
                        {{ title }}
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        {{ description }}
                    </p>
                </div>
            </div>

            <div class="mt-8">
                <slot />
            </div>


            <div class="mt-6 text-center text-xs text-muted-foreground">
                Developed by Mohammad Zubair Akrami
            </div>
        </div>
    </div>
</template>

