<template>
  <div class="text-primary bg-primary">
    <div
      class="flex min-h-screen pt-2 mx-auto max-w-xsm sm:max-w-2xl md:max-w-2xl lg:max-w-6xl"
    >
      <Sidebar class="hidden sm:flex" />
      <div class="w-full space-y-4 sm:px-6 md:px-12">
        <Header @sidebartoggle="toggle = !toggle" />

        <Nuxt />
      </div>
    </div>
    <MobileNavigation class="sm:hidden" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onUnmounted,
  useContext,
} from '@nuxtjs/composition-api'

import { useTheme } from '@/hooks'

export default defineComponent({
  setup() {
    const { theme } = useTheme()
    const { $db } = useContext().app

    onUnmounted(async () => {
      await $db.remove()
    })

    return {
      theme,
    }
  },
})
</script>
