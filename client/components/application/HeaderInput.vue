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
    <div>
      <input
        v-model="input"
        type="search"
        autocomplete="off"
        name="input"
        class="block w-full border-none rounded-lg outline-none pl-9 sm:pl-14 bg-secondary focus:ring focus:ring-brand"
        :placeholder="placeholder"
        @keydown.up.prevent="$refs.selectMenu.up()"
        @keydown.down.prevent="$refs.selectMenu.down()"
        @keydown.exact.enter.prevent="
          categoriesOpen
            ? $refs.selectMenu.setSelected()
            : $emit('action', input)
        "
      />
      <select-menu
        ref="selectMenu"
        name="categories"
        :open="categoriesOpen"
        :options="['Youtube', 'Music', 'Audio', 'Link']"
        @selected="addFromMenu"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { SearchIcon, ColumnsIcon } from 'vue-feather-icons'

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
    const categoriesOpen = ref(false)

    function addFromMenu(value: string) {
      input.value += value
    }

    watch(
      () => input.value,
      (value: string) => {
        if (categoriesOpen && value.slice(-1) !== '#')
          categoriesOpen.value = false
        if (value.slice(-1) === '#') categoriesOpen.value = true
      }
    )

    return { input, categoriesOpen, addFromMenu }
  },
})
</script>
