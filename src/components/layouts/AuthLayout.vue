<template>
  <LandingLayout>
    <div class="w-full mx-auto my-auto h-1/2 lg:max-w-sm">
      <div class="flex flex-col space-y-4">
        <div class="space-y-2">
          <h1 class="text-5xl font-semibold">{{ t(`${title}`) }}.</h1>
          <h2 class="text-2xl text-secondary">{{ t(`${subtitle}`) }}</h2>
        </div>
        <slot />
      </div>
    </div>
  </LandingLayout>
  <Teleport to="#notification">
    <Notification :notification="notification" />
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Notification } from '@/types'

defineProps<{ title: string; subtitle: string; notification?: Notification }>()
const { t } = useI18n()
</script>
