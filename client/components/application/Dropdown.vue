<template>
  <div>
    <IconOnlyButton
      class="relative flex items-center justify-between p-2 space-x-2 bg-secondary focus:outline-none"
      @click="onChange"
    >
      <div class="flex items-center space-x-2">
        <component :is="icon" size="1.25x" />
        <span v-if="items.length > 0" class="text-xs">{{ selectedItem }}</span>
        <slot v-else class="text-xs" />
      </div>

      <ChevronDownIcon v-if="!open" class="flex-shrink-0" size="1.25x" />
      <ChevronUpIcon v-else class="flex-shrink-0" size="1.25x" />
    </IconOnlyButton>
    <SelectMenu
      v-if="items.length > 0"
      :open="open"
      :options="items"
      @selected="handleSelected"
    />
    <div v-else-if="items.length === 0 && open" class="absolute z-50 top-8">
      <slot name="menu" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { FolderIcon, ChevronDownIcon, ChevronUpIcon } from 'vue-feather-icons'

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
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
  },

  components: {
    FolderIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  },

  setup(props, { emit }) {
    const open = ref(props.show)
    const selectedItem = ref(props.items[0])

    function onChange() {
      open.value = !open.value
      emit('change', open.value)
    }

    watch(
      () => props.show,
      (show) => {
        open.value = show
      }
    )

    function handleSelected(item: string) {
      selectedItem.value = item
      open.value = false
      emit('selected', { item, type: props.type })
    }
    return { open, close, selectedItem, handleSelected, onChange }
  },
})
</script>
