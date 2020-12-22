<template>
  <div class="min-h-screen text-primary bg-primary">
    <div
      class="flex flex-col mx-auto lg:flex-row lg:justify-between max-w-xsm md:max-w-2xl lg:max-w-6xl"
    >
      <Sidebar
        class="fixed z-50 min-h-screen"
        :toggled="toggle"
        @sidebartoggle="toggle = !toggle"
      />
      <div class="w-full min-h-screen py-2 space-y-2 lg:pl-64">
        <Header :type="type" @sidebartoggle="toggle = !toggle" />
        <div class="">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from '@nuxtjs/composition-api'
import { useTheme } from '@/hooks'

export default defineComponent({
  setup() {
    const { theme } = useTheme()
    const toggle = ref(false)
    const type = ref('search')

    function hotkeyListener(event: KeyboardEvent) {
      if (event.key === 'i' && event.ctrlKey) {
        type.value = 'addEntry'
      } else if (event.key === 'k' && event.ctrlKey) {
        event.preventDefault()
        type.value = 'search'
      }
    }

    window.addEventListener('keydown', hotkeyListener)

    onUnmounted(() => {
      window.removeEventListener('keydown', hotkeyListener)
    })

    return { toggle, theme, type }
  },
})
</script>
