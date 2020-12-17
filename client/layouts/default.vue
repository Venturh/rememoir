<template>
  <html>
    <div
      class="flex flex-col min-h-screen md:flex-row md:justify-between bg-primary text-primary"
    >
      <Sidebar
        class="fixed z-50 min-h-screen"
        :toggled="toggle"
        :expanded="expanded"
        @sidebartoggle="toggle = !toggle"
        @sidebarExpand="expanded = !expanded"
      />
      <div
        class="w-full min-h-screen py-2 mx-auto space-y-2 max-w-xsm md:max-w-6xl"
        :class="expanded ? 'md:pl-64 ' : 'md:pl-32 '"
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
    const expanded = ref(false)

    return { toggle, theme, expanded }
  },
})
</script>
