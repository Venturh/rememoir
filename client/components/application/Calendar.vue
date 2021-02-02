<template>
  <div class="relative flex justify-between w-full space-x-2">
    <Dropdown class="w-1/2" :show="show" :icon="CalendarIcon" @change="setShow">
      <span class="text-sm"> {{ displayDate }}</span>
      <template v-slot:menu>
        <VueTailWindPicker
          :inline="true"
          :start-date="date ? date : $dayjs().format('YYYY-MM-DD')"
          :init="false"
          :date-range="true"
          class="picker"
          :theme="calendarTheme"
          @change="onChange"
        />
      </template>
    </Dropdown>
    <Button class="w-1/2 text-sm" variant="1" @click="reset">
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
import { CalendarIcon } from 'vue-feather-icons'
import { calendarTheme } from '@/config/data'

export default defineComponent({
  components: {
    VueTailWindPicker: () => import('vue-tailwind-picker'),
    CalendarIcon,
  },
  setup(_, { emit }) {
    const { $dayjs } = useContext().app
    const show = ref(false)

    const displayDate = computed(() =>
      date.value ? $dayjs(date.value).format('dd, DD.MM.YY') : 'All Time'
    )

    const date = ref()
    function onChange(value: any) {
      show.value = false
      date.value = value
      emit('change', { type: 'date', item: $dayjs(value) })
    }

    function reset() {
      emit('change', { type: 'date', item: undefined })
      show.value = false
      date.value = ''
    }

    function setShow(val: boolean) {
      show.value = val
    }

    return {
      calendarTheme,
      date,
      displayDate,
      onChange,
      show,
      setShow,
      reset,
      CalendarIcon,
    }
  },
})
</script>

<style lang="postcss" scoped>
/* Hide calendar header */
.picker >>> * {
  @apply rounded-lg;
}
.picker >>> #v-tailwind-picker-header {
  display: none;
}
.picker >>> *:first {
  @apply bg-secondary;
  @apply text-primary;
}
</style>
