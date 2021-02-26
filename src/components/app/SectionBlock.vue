<template>
  <div class="w-full divide-y divide-borderPrimary">
    <div class="space-y-2">
      <p
        class="font-semibold"
        :class="primary === true ? 'text-lg sm:text-xl' : 'sm:text-lg '"
      >
        {{ t(`${title}`) }}.
      </p>
      <p :class="primary === true ? 'sm:text-lg' : 'text-sm sm:text-base '">
        {{ t(`${description}`) }}
      </p>
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

defineProps<{ title: string; description: string; primary?: boolean }>()

const { t } = useI18n()
</script>
