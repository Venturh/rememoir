<template>
  <AppLayout>
    <SplitLayout>
      <template #first>
        <div class="sm:mt-2 lg:mt-0">
          <slot />
        </div>
      </template>

      <template #second>
        <VerticalNavigation
          class="sm:w-1/2"
          :items="settingsItems"
          :selected="settingsItems[value]"
          expanded
        />
      </template>
    </SplitLayout>
  </AppLayout>
  <Teleport to="#notification">
    <Notification :notification="notification" />
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, Teleport } from 'vue'
import { settingsItems } from '@/config/data'
import type { Notification } from '@/types'

defineProps<{ value: number; notification?: Notification }>()
</script>
