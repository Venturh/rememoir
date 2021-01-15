<template>
  <div class="relative w-full mt-1 rounded-md shadow-sm">
    <div
      class="absolute inset-y-0 left-0 flex items-center pointer-events-none sm:pl-3"
    >
      <ColumnsIcon
        size="1.25x"
        class="ml-2 stroke-current bg-secondary text-brand"
      />
    </div>

    <div
      class="flex space-x-2"
      @keydown.esc.prevent="$emit('cancel')"
      @keydown.up.prevent="$refs.selectMenu.up()"
      @keydown.down.prevent="$refs.selectMenu.down()"
      @keydown.exact.enter.prevent="
        categoriesOpen ? $refs.selectMenu.setSelected() : $emit('action', input)
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'
import { SearchIcon, ColumnsIcon } from 'vue-feather-icons'
import { categories } from '@/config/data'

export default defineComponent({
  components: {
    SearchIcon,
    ColumnsIcon,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup() {
    const input = ref('')
    const inputRef = ref<any>()
    const categoriesOpen = ref(false)

    function addFromMenu(value: string) {
      input.value += value
    }

    onMounted(() => {
      inputRef.value?.$el.focus()
    })

    watch(
      () => input.value,
      (value: string) => {
        if (categoriesOpen && value.slice(-1) !== '#')
          categoriesOpen.value = false
        if (value.slice(-1) === '#') categoriesOpen.value = true
      }
    )

    return { input, inputRef, categoriesOpen, addFromMenu, focus, categories }
  },
})
</script>
