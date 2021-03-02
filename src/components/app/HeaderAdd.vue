<template>
  <div>
    <div
      v-click-outside="() => $emit('cancel')"
      class="relative w-full mt-1 rounded-md"
    >
      <div class="absolute inset-y-0 left-0 flex items-center sm:pl-3">
        <Dropdown
          type="inputType"
          :items="items"
          :selected="selected"
          :border="false"
          @selected="handleInputTypeDropdown"
        />
      </div>

      <div class="absolute inset-y-0 right-0 items-center hidden sm:flex">
        <Calendar
          single
          :open="calendar.open"
          :indicator="calendar.date !== null"
          @change="addCalendar"
        />
      </div>

      <div
        class="flex space-x-2"
        @keydown.esc.prevent="$emit('cancel')"
        @keydown.exact.enter="handleEnter($event)"
      >
        <HeaderInput
          ref="inputRef"
          v-model:inputValue="input"
          :placeholder="
            inputType === 'entry' ? t('addNewEntry') : t('addNewList')
          "
          :search="false"
          :disabled="loading"
        />

        <Loading v-if="loading" class="absolute w-6 h-6 right-8 top-1.5" />
      </div>

      <div v-if="descriptonActive" class="relative">
        <HeaderInput
          ref="inputDescRef"
          v-model:inputValue="description"
          class="absolute z-50 w-full top-1.5 border"
          type="text"
          placeholder="Add a Description"
          :expanded="descriptonActive"
          @enter="handleEnter"
          @cancel="cancelDescription"
        />
      </div>
      <SelectMenu
        ref="categoriesMenuRef"
        v-model:open="categoriesOpen"
        name="categories"
        :options="categories"
        @selected="addFromMenu"
        @cancel="inputRef.$el.focus()"
      />
      <div>
        <SelectMenu
          v-if="inputType === 'entry'"
          ref="listMenuRef"
          name="list"
          :open="list.open"
          :options="avaibleLists"
          @selected="addFromMenu"
          @cancel="inputRef.$el.focus()"
        />
      </div>
    </div>
    <Notification
      v-if="inputType === 'list' && list.open"
      :notification="{ show: true, type: 'error', text: 'addListtoList' }"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  reactive,
  watch,
  defineProps,
  defineEmit,
} from 'vue'
import { useI18n } from 'vue-i18n'
import { RiLayoutColumnLine, RiListCheck } from 'vue-remix-icons'
import { useAvaibleLists } from '@/hooks'
import { categories } from '@/config/data'
import { getDb } from '@/db/Database'
import type { HeaderInputType, MenuOptionItem } from '@/types'
import dayjs, { Dayjs } from 'dayjs'

const props = defineProps<{
  inputType: HeaderInputType
  loading?: boolean
}>()

const emit = defineEmit(['cancel', 'inputTypeChange', 'action'])

const { t } = useI18n()
const input = ref('')
const inputRef = ref<any>()
const categoriesMenuRef = ref<any>()
const listMenuRef = ref<any>()
const inputDescRef = ref<any>()
const inputTypeOpen = ref(false)
const categoriesOpen = ref(false)

const descriptonActive = ref(false)
const description = ref('')
const calendar = reactive<{
  open: boolean
  date: Dayjs | null
  disabled: boolean
}>({
  open: false,
  date: null,
  disabled: false,
})
const list = ref({ open: false, id: '', text: '' })

const db = getDb()
const { avaibleLists } = useAvaibleLists(db)

const items = [
  { icon: RiListCheck, text: '' },
  { icon: RiLayoutColumnLine, text: '' },
]

const selected = computed(() => {
  return props.inputType === 'list' ? items[0] : items[1]
})

function addFromMenu({ text, info }: MenuOptionItem) {
  //from menu list
  if (info) {
    list.value.id = info
    list.value.text = text
  }
  input.value += text
  inputRef.value?.$el.focus()
}

function setInputType() {
  if (props.inputType === 'entry') emit('inputTypeChange', 'list')
  else emit('inputTypeChange', 'entry')
}

function handleInputTypeDropdown() {
  inputTypeOpen.value = false
  setInputType()
}

function cancelDescription() {
  input.value = input.value.slice(0, -2)
  descriptonActive.value = false
  inputRef.value?.$el.focus()
}

function toggleCalendar() {
  if (input.value.includes('~')) return
  calendar.open = !calendar.open
}

function addCalendar(date: Dayjs) {
  calendar.open = false
  const split = input.value.split(' ')
  const index = split.findIndex((s) => s.includes('~'))
  if (index !== -1) {
    split.splice(index, 1)
    input.value = split.join(' ').replace('~', '')
  }
  input.value += ` ~${date.format('DD.MM.YY')}`
  calendar.date = date
}

function handleEnter(event: Event) {
  if (descriptonActive.value) {
    descriptonActive.value = false
    input.value = input.value.slice(0, -2)
    inputRef.value?.$el.focus()
  } else submit()
}

function submit() {
  input.value = input.value.replace(list.value.text, '').replace('@', '')
  if (calendar.date) {
    if (!input.value.includes('~')) calendar.date = dayjs()
    else
      input.value = input.value.replace(
        ` ~${calendar.date!.format('DD.MM.YY')}`,
        ''
      )
  } else calendar.date = dayjs()
  emit('action', {
    data: input.value,
    description: description.value,
    date: calendar.date,
    listId: list.value.id,
  })
  input.value = ''
  description.value = ''
}

onMounted(() => {
  inputRef.value?.$el.focus()
})

watch(
  () => input.value,
  (value: string) => {
    if (categoriesOpen.value && value.slice(-1) !== '#') {
      categoriesOpen.value = false
    } else if (value.slice(-1) === '#') {
      categoriesOpen.value = true
    }
    if (value.slice(-1) === '@') {
      list.value.open = true
    } else if (list.value.open && value.slice(-1) !== '@')
      list.value.open = false
    if (value.slice(-2) === '//') {
      inputRef.value?.$el.blur()
      descriptonActive.value = true
    } else if (descriptonActive.value && value.slice(-1) !== '//') {
      descriptonActive.value = false
    }
    if (value.slice(-1) === '~') {
      inputRef.value?.$el.blur()
      calendar.open = true
    } else if (calendar.open && value.slice(-1) !== '~') {
      calendar.open = false
    }
    // if (!input.value.includes('~')) {
    //   calendar.date = ''
    // }
  }
)
</script>
