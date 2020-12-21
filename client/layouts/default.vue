<template>
  <div class="min-h-screen text-primary bg-primary">
    <div
      class="flex flex-col mx-auto md:flex-row md:justify-between max-w-xsm lg:max-w-6xl"
    >
      <Sidebar
        class="fixed z-50 min-h-screen border-r border-primaryText"
        :toggled="toggle"
        @sidebartoggle="toggle = !toggle"
      />
      <div class="w-full min-h-screen py-2 space-y-2 md:pl-64">
        <Header @sidebartoggle="toggle = !toggle" />
        <div class="">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
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
