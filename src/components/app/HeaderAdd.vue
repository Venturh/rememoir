<template>
  <div class="relative w-full mt-1 rounded-md">
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
        :indicator="calendar.date !== ''"
        @change="addCalendar"
      />
    </div>

    <div
      class="flex space-x-2"
      @keydown.esc.prevent="$emit('cancel')"
      @keydown.up.prevent="$refs.selectMenuRef.up()"
      @keydown.down.prevent="$refs.selectMenuRef.down()"
      @keydown.exact.enter="handleEnter($event)"
    >
      <HeaderInput
        ref="inputRef"
        v-model:inputValue="input"
        :input-value="input"
        :placeholder="
          inputType === 'entry' ? t('addNewEntry') : t('addNewList')
        "
        :search="false"
        :disabled="loading"
      />

      <Loading v-if="loading" class="absolute w-6 h-6 right-4 top-2" />
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
    <select-menu
      ref="selectMenuRef"
      name="categories"
      :open="categoriesOpen"
      :options="categories"
      @selected="addFromMenu"
    />
    <div>
      <select-menu
        v-if="inputType === 'entry'"
        ref="selectMenuRef"
        name="list"
        :open="list.open"
        :options="avaibleLists"
        @selected="addList"
      />
      <Error
        v-if="inputType === 'list' && list.open"
        message="Cant add a List to List"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiLayoutColumnLine, RiListCheck } from 'vue-remix-icons'
import { categories } from '@/config/data'
import { HeaderInputType, MenuOptionItem } from '@/types'
import { useAvaibleLists } from '@/hooks'
import { getDb } from '@/db/Database'

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputType: {
      type: String as PropType<HeaderInputType>,
      default: 'entry',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const input = ref('')
    const inputRef = ref<any>()
    const selectMenuRef = ref<any>()
    const inputDescRef = ref<any>()
    const inputTypeOpen = ref(false)
    const categoriesOpen = ref(false)

    const descriptonActive = ref(false)
    const description = ref('')
    const calendar = ref({ open: false, date: '', disabled: false })
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

    function addFromMenu(value: MenuOptionItem) {
      input.value += value.text
    }
    function addList(value: MenuOptionItem) {
      list.value.id = value.info!
      list.value.text = value.text
      input.value += value.text
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
      calendar.value.open = !calendar.value.open
    }

    function addCalendar(date: string) {
      calendar.value.open = false
      const split = input.value.split(' ')
      const index = split.findIndex((s) => s.includes('~'))
      if (index !== -1) {
        split.splice(index, 1)
        input.value = split.join(' ').replace('~', '')
      }
      input.value += ` ${date}`
      calendar.value.date = date
    }

    function handleEnter(event: Event) {
      if (categoriesOpen.value || list.value.open) {
        event.preventDefault()
        selectMenuRef.value.setSelected()
      } else if (descriptonActive.value) {
        descriptonActive.value = false
        input.value = input.value.slice(0, -2)
        inputRef.value?.$el.focus()
      } else submit()
    }

    function submit() {
      input.value = input.value
        .replace(calendar.value.date, '')
        .replace(list.value.text, '')
        .replace('@', '')
      console.log('submit ~ input.value', input.value)
      emit('action', {
        data: input.value,
        description: description.value,
        date: calendar.value.date,
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
          calendar.value.open = true
        } else if (calendar.value.open && value.slice(-1) !== '~') {
          calendar.value.open = false
        }
        if (calendar.value.date !== '' && !input.value.includes('~')) {
          calendar.value.date = ''
        }
      }
    )

    return {
      t,
      input,
      inputRef,
      setInputType,
      inputTypeOpen,
      categoriesOpen,
      handleInputTypeDropdown,
      addFromMenu,
      focus,
      categories,
      list,
      items,
      selected,
      submit,
      descriptonActive,
      selectMenuRef,
      handleEnter,
      description,
      inputDescRef,
      cancelDescription,
      avaibleLists,
      calendar,
      toggleCalendar,
      addCalendar,
      addList,
    }
  },
})
</script>
