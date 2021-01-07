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
        <Header @sidebartoggle="toggle = !toggle" />
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
    const content = ref<HTMLDivElement>()

    const { theme } = useTheme()
    const { $dayjs, $db } = useContext().app
    const toggle = ref(false)

    $dayjs.updateLocale('en', {
      calendar: {
        lastDay: '[Yesterday, ] DD.MM.YYYY',
        sameDay: '[Today, ] DD.MM.YYYY',
        nextDay: '[Morgen, ] DD.MM.YYYY',
        lastWeek: '[last] dddd ',
      },
      relativeTime: {
        future: '%s',
        past: '%s',
        s: 'now',
        m: '1 min',
        mm: '%d min',
        h: '1 h',
        hh: '%d hrs',
        d: '1 d',
        dd: '% d',
        M: '1 m',
        MM: '% dm',
        y: '1 y',
        yy: '%d y',
      },
    })
    $dayjs.updateLocale('de', {
      calendar: {
        lastDay: '[Gestern, ] DD.MM.YYYY',
        sameDay: '[Heute, ] DD.MM.YYYY',
        nextDay: '[Morgen, ] DD.MM.YYYY',
        lastWeek: '[Letzte Woche] dddd ',
      },
      relativeTime: {
        future: '%s',
        past: '%s',
        s: 'gerade',
        m: '1 min',
        mm: '%d min',
        h: '1 std',
        hh: '%d std',
        d: '1 t',
        dd: '%d t',
        M: '1 m',
        MM: '%d m',
        y: '1 j',
        yy: '%d j',
      },
    })

    onUnmounted(async () => {
      await $db.remove()
    })

    return { toggle, theme, content }
  },
})
</script>
