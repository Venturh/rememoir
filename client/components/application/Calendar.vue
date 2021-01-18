<template>
  <div class="relative flex space-x-2 lg:space-x-0 lg:space-y-2 lg:flex-col">
    <VueTailWindPicker
      v-if="!isMobile"
      :inline="true"
      :selected-date="null"
      :init="false"
      :date-range="true"
      class="picker"
      :theme="calendarTheme(isMobile)"
      @change="onChange"
    >
    </VueTailWindPicker>
    <Dropdown v-if="isMobile" :show="show" @change="setShow">
      <CalendarIcon size="1.25x" />
      <input
        :value="$dayjs(date).calendar()"
        class="text-xs border-none outline-none bg-secondary"
        @change="onChange"
      />
      <template v-slot:menu>
        <VueTailWindPicker
          :inline="true"
          :selected-date="null"
          :init="false"
          :date-range="true"
          class="picker"
          :theme="calendarTheme(isMobile)"
          @change="onChange"
        >
        </VueTailWindPicker>
      </template>
    </Dropdown>
    <Button
      class="w-full px-4 text-xs md:text-base"
      variant="1"
      @click="$emit('change', { type: 'date', item: undefined })"
    >
      {{ $t('reset') }}
    </Button>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { useBreakpointTailwindCSS } from 'vue-composable'
import { CalendarIcon } from 'vue-feather-icons'
import { calendarTheme } from '@/config/data'

export default defineComponent({
  components: {
    VueTailWindPicker: () => import('vue-tailwind-picker'),
    CalendarIcon,
  },
  setup(props, { emit }) {
    const { $dayjs } = useContext().app
    const { current } = useBreakpointTailwindCSS()
    const show = ref(false)

    const isMobile = computed(() => {
      if (['lg', 'xl'].includes(current.value as string)) return false
      return true
    })

    const date = ref()
    function onChange(value: any) {
      if (isMobile) show.value = false
      date.value = value
      emit('change', { type: 'date', item: $dayjs(value) })
    }

    function setShow(val: boolean) {
      show.value = val
    }

    return { calendarTheme, date, onChange, isMobile, show, setShow }
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
