<template>
  <router-link class="font-medium hover:text-brand" :to="to">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ to: string }>()
</script>
