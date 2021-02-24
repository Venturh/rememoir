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
