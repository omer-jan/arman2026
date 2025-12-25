<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import logo from "../../images/applogo.svg";

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>

 <img
    :src="logo"
    alt="App Logo"
    class="h-40 w-40 object-contain"
/>

</template>
