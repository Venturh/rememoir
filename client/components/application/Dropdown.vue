<template>
  <div class="w-full">
    <IconOnlyButton
      class="relative flex items-center justify-between w-full px-1 py-2 space-x-1 bg-secondary focus:outline-none"
      @click="onChange"
    >
      <div
        class="flex items-center space-x-2"
        :class="{ 'space-x-0': selected }"
      >
        <component :is="selected.icon" v-if="selected" size="1x" />
        <component :is="icon" v-else size="1x" />
        <span v-if="!selected && items.length > 0" class="text-xs">
          {{ selectedItem.text }}
        </span>
        <slot v-else class="text-xs" />
      </div>

      <ChevronDownIcon v-if="!open" class="flex-shrink-0" size="1.25x" />
      <ChevronUpIcon v-else class="flex-shrink-0" size="1.25x" />
    </IconOnlyButton>
    <SelectMenu
      v-if="items.length > 0"
      :open="open"
      :options="items"
      :optional-item="optionalItem"
      :selected="selected"
      with-icons
      @selected="handleSelected"
    />
    <div v-else-if="items.length === 0 && open" class="absolute z-50 top-8">
      <slot name="menu" />
    </div>
  </div>
</template>

<script lang="ts">
import { MenuOption, MenuOptionItem } from '@/types'
import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import { FolderIcon, ChevronDownIcon, ChevronUpIcon } from 'vue-feather-icons'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<MenuOption>,
      default: () => [],
    },
    optionalItem: {
      type: Object as PropType<MenuOptionItem>,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Object as PropType<MenuOptionItem>,
      default: () => {},
    },
  },

  components: {
    FolderIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  },

  setup(props, { emit }) {
    const open = ref(props.show)
    const selectedItem = ref(props.selected || props.items[0])

    function onChange() {
      open.value = !open.value
      emit('change', open.value)
    }

    function handleSelected(item: MenuOptionItem) {
      selectedItem.value = item
      open.value = false
      emit('selected', { item: item.text, type: props.type })
    }

    watch(
      () => props.show,
      (val) => {
        open.value = val
      }
    )
    return { open, close, selectedItem, handleSelected, onChange }
  },
})
</script>
