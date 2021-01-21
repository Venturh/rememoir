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
      <Loading v-if="loading" />
      {{ loading ? loading : null }}
    </div>
    <select-menu
      ref="selectMenu"
      name="categories"
      :open="categoriesOpen"
      :options="categories"
      @selected="addFromMenu"
    />
    <div>
      <select-menu
        v-if="inputType === 'entry'"
        ref="selectMenu"
        name="list"
        :open="listsOpen"
        :options="lists"
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
import { HeaderInputType, MenuOption, MenuOptionItem } from '@/types'
import { getLists } from '@/db/list'

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
    const inputTypeOpen = ref(false)
    const categoriesOpen = ref(false)
    const listsOpen = ref(false)
    const lists = ref<MenuOption>([])
    const { $db } = useContext().app

    const items = [
      { icon: ListIcon, text: '' },
      { icon: ColumnsIcon, text: '' },
    ]

    function addFromMenu(value: MenuOptionItem) {
      input.value += value.text
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

    onBeforeMount(async () => {
      const query = await getLists($db).exec()
      lists.value = query.map((e) => {
        return { icon: null, text: e.title }
      })
      console.log('onBeforeMount ~ query', lists.value)
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
