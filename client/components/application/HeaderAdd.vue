<template>
  <div class="relative w-full mt-1 rounded-md shadow-sm">
    <div class="absolute inset-y-0 left-0 flex items-center sm:pl-3">
      <Dropdown
        type="categories"
        :items="items"
        :selected="selected"
        @selected="handleInputTypeDropdown"
      />
    </div>

    <div
      class="flex space-x-2"
      @keydown.esc.prevent="$emit('cancel')"
      @keydown.up.prevent="$refs.selectMenu.up()"
      @keydown.down.prevent="$refs.selectMenu.down()"
      @keydown.exact.enter.prevent="
        categoriesOpen || listsOpen
          ? $refs.selectMenu.setSelected()
          : $emit('action', input)
      "
    >
      <HeaderInput
        ref="inputRef"
        v-model="input"
        :input-value="input"
        :placeholder="
          inputType === 'entry' ? $t('addNewEntry') : $t('addNewList')
        "
        :search="false"
      />
    </div>
    <select-menu
      ref="selectMenu"
      name="categories"
      :open="categoriesOpen"
      :options="categories"
      @selected="addFromMenu"
    />
    <select-menu
      ref="selectMenu"
      name="list"
      :open="listsOpen"
      :options="lists"
      @selected="addFromMenu"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import { ColumnsIcon, ListIcon } from 'vue-feather-icons'
import { categories, lists } from '@/config/data'
import { HeaderInputType } from '@/types'

export default defineComponent({
  components: {
    ColumnsIcon,
    ListIcon,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputType: {
      type: String as PropType<HeaderInputType>,
      default: 'entry',
    },
  },
  setup(props, { emit }) {
    const input = ref('')
    const inputRef = ref<any>()
    const inputTypeOpen = ref(false)
    const categoriesOpen = ref(false)
    const listsOpen = ref(false)

    const items = [
      { icon: ListIcon, text: '' },
      { icon: ColumnsIcon, text: '' },
    ]

    function addFromMenu(value: string) {
      input.value += value
    }

    function setInputType() {
      if (props.inputType === 'entry') emit('inputTypeChange', 'list')
      else emit('inputTypeChange', 'entry')
    }

    const selected = computed(() => {
      return props.inputType === 'list' ? items[0] : items[1]
    })

    function handleInputTypeDropdown() {
      inputTypeOpen.value = false
      setInputType()
    }

    onMounted(() => {
      inputRef.value?.$el.focus()
    })

    watch(
      () => input.value,
      (value: string) => {
        if (categoriesOpen && value.slice(-1) !== '#') {
          categoriesOpen.value = false
        } else if (value.slice(-1) === '#') {
          categoriesOpen.value = true
        }
        if (value.slice(-1) === '@') {
          listsOpen.value = true
        } else if (listsOpen && value.slice(-1) !== '@') listsOpen.value = false
      }
    )

    return {
      input,
      inputRef,
      setInputType,
      inputTypeOpen,
      categoriesOpen,
      handleInputTypeDropdown,
      addFromMenu,
      focus,
      categories,
      lists,
      listsOpen,
      ListIcon,
      ColumnsIcon,
      items,
      selected,
    }
  },
})
</script>
