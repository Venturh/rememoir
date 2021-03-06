<template>
  <div class="relative flex justify-between w-full space-x-2">
    <div
      v-if="single && indicator"
      class="absolute w-2 h-2 rounded-full right-1.5 top-1 bg-brand"
    />

    <input :value="date" type="date" @change="onChange($event)" />
    <IconOnlyButton
      variant="primary"
      class="p-2"
      :class="{ 'shadow-sm  border border-borderPrimary': !single }"
    >
      <Icon :icon="RiCalendarLine" />
    </IconOnlyButton>

    <Dropdown
      v-if="!single"
      class="w-1/2"
      type="date"
      :items="time"
      :border="true"
      :optional-item="
        date !== ''
          ? { text: 'Custom', info: 'DEFAULT', translate: true }
          : undefined
      "
      :icon="RiCalendarLine"
      @selected="onSecondaryChange"
    />

    <Button
      v-if="!single"
      class="w-1/3 text-sm"
      :variant="date !== '' ? 'brand25' : 'disabled'"
      @click="reset"
    >
      {{ t('reset') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs, { Dayjs } from 'dayjs'
import { RiCalendarLine } from 'vue-remix-icons'
import { calendarTheme, time } from '@/config/data'

const props = defineProps<{
  single?: boolean
  open?: boolean
  disabled?: boolean
  indicator?: boolean
}>()

const emit = defineEmit(['change'])

const { t } = useI18n()
const show = ref(props.open)
const date = ref('')

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value
  show.value = false
  date.value = value
  if (props.single) emit('change', dayjs(value))
  else emit('change', { type: 'date', item: dayjs(value) })
}
function onSecondaryChange({
  item,
  type,
}: {
  item: Dayjs | string
  type: string
}) {
  show.value = false
  date.value = ''
  if (item === 'DEFAULT')
    emit('change', { type: 'customDate', item: item as string })
  else
    emit('change', {
      type: 'customDate',
      item: (item as Dayjs).valueOf().toString(),
    })
}

function reset() {
  emit('change', { type: 'date', item: undefined })
  show.value = false
  date.value = ''
}
</script>

<style lang="postcss" scoped>
input[type='date'] {
  position: absolute;
  width: 100%;
  opacity: 0;
  border: 0;
  overflow: hidden;
  cursor: pointer;
  filter: invert(0.8);
}
input::-webkit-calendar-picker-indicator {
  position: absolute;
  top: -150%;
  left: -150%;
  width: 300%;
  height: 300%;
  cursor: pointer;
  background: black;
}
</style>
