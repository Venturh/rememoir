<template>
  <div class="relative w-full mt-1 rounded-md shadow-sm">
    <div class="absolute inset-y-0 left-0 flex items-center sm:pl-3">
      <button
        class="flex items-center justify-center h-full p-2 rounded-md focus:outline-none focus:ring focus:ring-brand"
        @click="setInputType"
      >
        <ColumnsIcon
          v-if="inputType === 'entry'"
          size="1.25x"
          class="stroke-current bg-secondary text-brand"
        />
        <ListIcon
          v-else
          size="1.25x"
          class="stroke-current bg-secondary text-brand"
        />
      </button>
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
      <Input
        ref="inputRef"
        v-model="input"
        :input-value="input"
        :placeholder="placeholder"
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
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
import { ColumnsIcon, ListIcon } from 'vue-feather-icons'
import { categories, lists } from '@/config/data'

type InputType = 'list' | 'entry'

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
  },
  setup() {
    const inputType = ref<InputType>('entry')
    const input = ref('')
    const inputRef = ref<any>()
    const categoriesOpen = ref(false)
    const listsOpen = ref(false)

    function addFromMenu(value: string) {
      input.value += value
    }

    function setInputType() {
      if (inputType.value === 'entry') inputType.value = 'list'
      else inputType.value = 'entry'
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
      inputType,
      setInputType,
      categoriesOpen,
      addFromMenu,
      focus,
      categories,
      lists,
      listsOpen,
    }
  },
})
</script>
