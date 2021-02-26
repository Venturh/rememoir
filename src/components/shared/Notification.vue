<template>
  <div
    v-if="notification && notification.show"
    class="absolute left-0 right-0 z-50 w-3/4 px-2 py-3 mx-auto rounded-md sm:w-1/3 bottom-16 sm:bottom-6"
    :class="[colors]"
  >
    <div class="flex items-center space-x-2">
      <Icon :icon="icon" size="sm" />

      <p class="text-sm">
        {{ t(`${notification.text}`) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  RiCheckboxCircleLine,
  RiFileWarningLine,
  RiInformationLine,
} from 'vue-remix-icons'

import type { Notification, NotificationType } from '@/types'

const props = defineProps<{ notification: Notification }>()

const { t } = useI18n()

const colors = computed(() => {
  const map = new Map<NotificationType, string>([
    ['success', 'bg-success text-black'],
    ['info', 'text-primary bg-brand25'],
    ['error', 'bg-error text-black'],
  ])
  return map.get(props.notification.type || 'info')
})
const icon = computed(() => {
  const map = new Map<NotificationType, Object>([
    ['success', RiCheckboxCircleLine],
    ['info', RiInformationLine],
    ['error', RiFileWarningLine],
  ])
  return map.get(props.notification.type || 'info')
})
</script>
