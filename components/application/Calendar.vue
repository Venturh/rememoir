<template>
  <div class="relative flex justify-between w-full px-2 space-x-2">
    <Dropdown
      class="w-2/12"
      :show="show"
      :icon="CalendarIcon"
      icon-only
      @change="setShow"
    >
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
    <Dropdown
      class="w-1/2"
      type="date"
      :items="time"
      :optional-item="
        date !== '' ? { text: 'Custom', info: 'DEFAULT' } : undefined
      "
      :icon="CalendarIcon"
      @selected="onSecondaryChange"
    />

    <Button class="text-sm" variant="1" @click="reset">
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
import { calendarTheme, time } from '@/config/data'

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

    const date = ref('')
    function onChange(value: string) {
      show.value = false
      date.value = value
      emit('change', { type: 'date', item: $dayjs(value) })
    }
    function onSecondaryChange({ item, type }: { item: any; type: string }) {
      show.value = false
      date.value = ''
      emit('change', { type, item })
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
      onSecondaryChange,
      show,
      setShow,
      reset,
      CalendarIcon,
      time,
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
