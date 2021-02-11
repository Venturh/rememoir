<template>
  <div class="relative flex justify-between w-full px-2 space-x-2">
    <div
      v-if="single && indicator"
      class="absolute w-2 h-2 rounded-full right-2.5 top-0.5 bg-brand"
    />
    <Dropdown
      :class="single ? 'w-full' : 'w-1/2'"
      :show="show || open"
      :icon="CalendarIcon"
      icon-only
      :border="!single"
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
      v-if="!single"
      class="w-1/2"
      type="date"
      :items="time"
      :disabled="disabled"
      :optional-item="
        date !== '' ? { text: 'Custom', info: 'DEFAULT' } : undefined
      "
      :icon="CalendarIcon"
      @selected="onSecondaryChange"
    />

    <Button v-if="!single" class="text-sm" variant="brand15" @click="reset">
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
  props: {
    single: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    indicator: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VueTailWindPicker: () => import('vue-tailwind-picker'),
    CalendarIcon,
  },
  setup(props, { emit }) {
    const { $dayjs } = useContext().app
    const show = ref(props.open)

    const displayDate = computed(() =>
      date.value ? $dayjs(date.value).format('dd, DD.MM.YY') : 'All Time'
    )

    const date = ref('')
    function onChange(value: string) {
      show.value = false
      date.value = value
      if (props.single) emit('change', `~${$dayjs(value).format('DD.MM.YY')}`)
      else emit('change', { type: 'date', item: $dayjs(value) })
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
