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
import {
  defineComponent,
  ref,
  onUnmounted,
  useContext,
} from '@nuxtjs/composition-api'
import { useTheme } from '@/hooks'

export default defineComponent({
  setup() {
    const { theme } = useTheme()
    const { $dayjs, $db } = useContext().app
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

    $dayjs.updateLocale('en', {
      calendar: {
        lastDay: '[Yesterday, ] DD.MM.YYYY',
        sameDay: '[Today, ] DD.MM.YYYY',
        nextDay: '[Morgen, ] DD.MM.YYYY',
        lastWeek: '[last] dddd ',
      },
    })
    $dayjs.updateLocale('de', {
      calendar: {
        lastDay: '[Gestern, ] DD.MM.YYYY',
        sameDay: '[Heute, ] DD.MM.YYYY',
        nextDay: '[Morgen, ] DD.MM.YYYY',
        lastWeek: '[Letzte Woche] dddd ',
      },
    })

    window.addEventListener('keydown', hotkeyListener)

    onUnmounted(async () => {
      console.log('unmount')

      window.removeEventListener('keydown', hotkeyListener)
      await $db.destroy()
      console.log($db)
    })

    return { toggle, theme, type }
  },
})
</script>
