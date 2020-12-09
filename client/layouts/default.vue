<template>
  <html>
    <div class="flex flex-col min-h-screen md:flex-row bg-primary text-primary">
      <Sidebar :toggled="toggle" @sidebartoggle="toggle = !toggle" />
      <div
        class="w-full min-h-screen py-2 mx-auto space-y-2 max-w-xsm md:max-w-4xl"
      >
        <Header @sidebartoggle="toggle = !toggle" />
        <Nuxt />
      </div>
    </div>
  </html>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useTheme } from '@/hooks'

export default defineComponent({
  setup() {
    const { theme } = useTheme()
    const toggle = ref(false)
    return { toggle, theme }
  },
})
</script>
