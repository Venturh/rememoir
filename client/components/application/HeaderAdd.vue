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
      @keydown.up.prevent="$refs.selectMenuRef.up()"
      @keydown.down.prevent="$refs.selectMenuRef.down()"
      @keydown.exact.enter="handleEnter($event)"
    >
      <HeaderInput
        ref="inputRef"
        v-model="input"
        :input-value="input"
        :placeholder="
          inputType === 'entry' ? $t('addNewEntry') : $t('addNewList')
        "
        :search="false"
        :disabled="loading"
      />

      <Loading v-if="loading" class="absolute w-6 h-6 right-4 top-2" />
    </div>

    <div v-if="descriptonActive" class="relative">
      <HeaderInput
        ref="inputDescRef"
        v-model="description"
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
        :open="listsOpen"
        :options="
          lists.map((l) => {
            return { icon: null, text: l.title }
          })
        "
        @selected="addFromMenu"
      />
      <Error
        v-if="inputType === 'list' && listsOpen"
        message="Cant add a List to List"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  PropType,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { ColumnsIcon, ListIcon } from 'vue-feather-icons'
import { categories } from '@/config/data'
import { HeaderInputType, MenuOptionItem } from '@/types'
import { useQueryLists } from '@/hooks/database'

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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const input = ref('')
    const inputRef = ref<any>()
    const selectMenuRef = ref<any>()
    const inputDescRef = ref<any>()
    const inputTypeOpen = ref(false)
    const categoriesOpen = ref(false)
    const listsOpen = ref(false)
    const descriptonActive = ref(false)
    const description = ref('')

    const { $db } = useContext().app
    const { lists, execute } = useQueryLists($db)

    const items = [
      { icon: ListIcon, text: '' },
      { icon: ColumnsIcon, text: '' },
    ]

    const selected = computed(() => {
      return props.inputType === 'list' ? items[0] : items[1]
    })

    function addFromMenu(value: MenuOptionItem) {
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

    function handleEnter(event: Event) {
      if (categoriesOpen.value || listsOpen.value) {
        event.preventDefault()
        selectMenuRef.value.setSelected()
      } else if (descriptonActive.value) {
        descriptonActive.value = false
        input.value = input.value.slice(0, -2)
        inputRef.value?.$el.focus()
      } else submit()
    }

    function submit() {
      emit('action', { data: input.value, description: description.value })
      input.value = ''
      description.value = ''
    }

    onMounted(() => {
      inputRef.value?.$el.focus()
    })

    onBeforeMount(() => {
      execute()
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
        if (value.slice(-2) === '//') {
          inputRef.value?.$el.blur()
          descriptonActive.value = true
        } else if (descriptonActive && value.slice(-1) !== '//') {
          descriptonActive.value = false
        }
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
      submit,
      descriptonActive,
      selectMenuRef,
      handleEnter,
      description,
      inputDescRef,
      cancelDescription,
    }
  },
})
</script>
