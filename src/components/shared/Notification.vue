<template>
  <div
    v-if="notification.show"
    class="absolute left-0 right-0 z-50 w-3/4 px-2 py-3 mx-auto border-l-4 rounded-sm sm:w-1/3 bottom-16 sm:bottom-6 border-brand15 bg-brand25"
  >
    <div class="flex items-center space-x-2">
      <Icon
        :icon="
          notification.type === 'info'
            ? RiFileWarningLine
            : RiCheckboxCircleLine
        "
        size="sm"
        color="brand"
      />

      <p class="text-sm text-brand">
        {{ t(`${notification.text}`) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiCheckboxCircleLine, RiFileWarningLine } from 'vue-remix-icons'

import type { Notification } from '@/types'

defineProps<{ notification: Notification }>()
const { t } = useI18n()
</script>
