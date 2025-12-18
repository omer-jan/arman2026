<!-- <script setup lang="ts">
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
</template> -->
<template>
    <!-- Modern gradient background with animated particles -->
    <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <!-- Animated background elements -->
        <div class="absolute inset-0">
            <!-- Gradient orbs -->
            <div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl"></div>

            <!-- Grid pattern -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEgwVjYwIiBmaWxsPSJub25lIiBzdHJva2U9IiM0NzU1NjkiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
        </div>

        <!-- Main content -->
        <div class="relative flex min-h-screen items-center justify-center p-4 md:p-8">
            <!-- Glass morphism card with floating effect -->
            <div class="relative w-full max-w-md">
                <!-- Floating shadow effect -->
                <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[32px] blur-xl opacity-10 animate-pulse"></div>

                <!-- Main card -->
                <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl shadow-blue-500/10 dark:shadow-black/30">
                    <!-- Accent header with gradient -->
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                        <div class="bg-white dark:bg-gray-800 h-1 rounded-full mx-auto w-24 opacity-50"></div>
                    </div>

                    <!-- Card content -->
                    <div class="p-8">
                        <!-- Logo section with animation -->
                        <div class="flex flex-col items-center gap-6">
                            <!-- Animated logo container -->
                            <div class="relative group">
                                <!-- Floating ring -->
                                <div class="absolute -ins-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition-all duration-500 animate-spin-slow"></div>

                                <!-- Logo background -->
                                <div class="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3 rounded-2xl shadow-lg">
                                    <img
                                        :src="logo"
                                        alt="App Logo"
                                        class="h-24 w-24 object-contain transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                                    />
                                </div>

                                <!-- Decorative dots -->
                                <div class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                                <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                            </div>

                            <!-- Title with gradient text -->
                            <div class="text-center space-y-3">
                                <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                                    {{ title }}
                                </h1>
                                <p class="text-gray-600 dark:text-gray-300 text-lg font-medium leading-relaxed max-w-xs mx-auto">
                                    {{ description }}
                                </p>
                            </div>
                        </div>

                        <!-- Form slot -->
                        <div class="mt-10">
                            <div class="relative">
                                <!-- Form background glow -->
                                <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl blur-lg"></div>
                                <div class="relative">
                                    <slot />
                                </div>
                            </div>
                        </div>

                        <!-- Footer with subtle animation -->
                        <div class="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                            <div class="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span class="inline-flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                    Developed by
                                </span>
                                <span class="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Mohammad Zubair Akrami
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Decorative floating elements -->
                <div class="absolute -z-10 -top-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
                <div class="absolute -z-10 -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-2xl"></div>
            </div>
        </div>

        <!-- Floating particles (optional) -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full animate-float"></div>
            <div class="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-500/30 rounded-full animate-float-delayed"></div>
            <div class="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-500/30 rounded-full animate-float"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from "../../../images/arman.png";
import { home } from '@/routes';
import { Link } from '@inertiajs/vue3';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<style scoped>
/* Custom animations */
@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes gradient {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.3;
    }
    50% {
        transform: translateY(-20px) translateX(10px);
        opacity: 0.6;
    }
}

@keyframes float-delayed {
    0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.3;
    }
    50% {
        transform: translateY(-15px) translateX(-10px);
        opacity: 0.6;
    }
}

.animate-spin-slow {
    animation: spin-slow 20s linear infinite;
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease-in-out infinite;
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float-delayed 7s ease-in-out infinite 1s;
}

/* Smooth transitions */
* {
    transition-property: transform, opacity, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Glass morphism enhancement */
.glass-effect {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
}
</style>
