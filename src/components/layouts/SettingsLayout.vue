<template>
  <AppLayout>
    <SplitLayout>
      <template #first>
        <slot />
      </template>

      <template #second>
        <VerticalNavigation
          class="w-1/2"
          :items="settingsItems"
          :selected="settingsItems[value]"
          expanded
        />
      </template>
    </SplitLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { settingsItems } from '@/config/data'

defineProps<{ value: number }>()
</script>
