<template>
  <VueTailWindPicker
    :inline="isMobile ? false : true"
    :init="false"
    :date-range="true"
    class="picker"
    :theme="{
      background: 'var(--bg-secondary)',
      text: 'text-primary',
      border: 'border-none',
      currentColor: 'bg-secondary',
      navigation: {
        hover: 'hover:bg-primary',
        focus: 'bg-brand25',
      },
      picker: {
        rounded: 'rounded-full',
        selected: {
          background: 'bg-brand ',
          text: 'text-brandContrast',
          border: 'border-primaryText ',
        },
      },
      event: {
        border: 'border-gray-700',
      },
    }"
    @change="onChange"
  >
    <Dropdown v-if="isMobile">
      <CalendarIcon size="1.25x" />
      <input
        :value="$dayjs(date).calendar()"
        class="text-xs border-none outline-none bg-secondary"
        @change="onChange"
      />
    </Dropdown>
  </VueTailWindPicker>
</template>

<script lang="ts">
import { useTheme } from '@/hooks'
import {
  computed,
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { useBreakpointTailwindCSS } from 'vue-composable'
import { CalendarIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    VueTailWindPicker: () => import('vue-tailwind-picker'),
    CalendarIcon,
  },
  setup(props, { emit }) {
    const { $dayjs } = useContext().app
    const { current } = useBreakpointTailwindCSS()
    const { theme } = useTheme()
    watch(theme, () => {
      console.log(theme.value)
    })
    const isMobile = computed(() => {
      if (['lg', 'xl'].includes(current.value as string)) return false
      return true
    })

    const date = ref()
    function onChange(value: any) {
      date.value = value
      emit('change', { type: 'date', item: $dayjs(value) })
    }
    return { date, onChange, isMobile, theme }
  },
})
</script>

<style lang="postcss" scoped>
/* Hide calendar header */
.picker >>> #v-tailwind-picker-header {
  display: none;
}
.picker >>> *:first {
  @apply bg-secondary;
  @apply text-primary;
}
</style>
