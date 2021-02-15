<template>
  <div class="text-primary bg-primary">
    <div
      class="flex min-h-screen pt-2 mx-auto max-w-xsm sm:max-w-2xl md:max-w-2xl lg:max-w-6xl"
    >
      <Sidebar />
      <div class="w-full space-y-4 sm:pl-26 lg:pl-64">
        <Header @sidebartoggle="toggle = !toggle" />

        <slot />
      </div>
    </div>
    <MobileNavigation class="sm:hidden" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useTheme from '@/hooks/useTheme'

export const DatabaseSymbol = Symbol('Database')
export default defineComponent({
  setup() {
    const { theme } = useTheme()

    return {
      theme,
    }
  },
})
</script>
