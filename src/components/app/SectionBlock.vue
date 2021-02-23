<template>
  <div class="divide-y divide-borderPrimary">
    <div class="space-y-2">
      <p class="text-lg font-semibold">{{ t(`${title}`) }}.</p>
      <p>{{ t(`${description}`) }}</p>
    </div>
    <div class="mt-4">
      <div class="mt-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ title: string; description: string }>()

const { t } = useI18n()
</script>
