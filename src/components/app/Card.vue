<template>
  <div
    class="relative flex flex-col w-full h-full p-3 space-y-3 rounded-md shadow-sm dark:shadow-none bg-secondary ring-1 ring-borderPrimary"
    @click="push(to)"
  >
    <slot />
    <div class="flex items-center justify-between">
      <Labels :items="categories" :amount="4" tooltip />
      <span class="text-sm">{{ timeFrom }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{ categories: Array<string>; timeFrom: string; to: string }>()

const { push } = useRouter()
</script>
