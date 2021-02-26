<template>
  <LandingLayout>
    <div class="w-full mx-auto my-auto h-1/2 lg:max-w-sm">
      <slot />
    </div>
  </LandingLayout>
  <Teleport to="#notification">
    <Notification :notification="notification" />
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Notification } from '@/types'

defineProps<{ notification?: Notification }>()
</script>

<style lang="postcss" scoped>
* >>> h1 {
  @apply text-5xl font-semibold;
}

* >>> h2 {
  @apply text-2xl text-secondary;
}
</style>
