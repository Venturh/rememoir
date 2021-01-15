<template>
  <div>
    <IconOnlyButton
      class="flex items-center justify-between p-2 space-x-2 w-28 bg-secondary focus:outline-none"
      @click="open = !open"
    >
      <div class="flex items-center space-x-2">
        <component :is="icon" size="1.25x" />
        <span class="text-xs">{{ selectedItem }}</span>
      </div>

      <ChevronDownIcon class="flex-shrink-0" size="1.25x" />
    </IconOnlyButton>
    <SelectMenu :open="open" :options="items" @selected="handleSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { FolderIcon, ChevronDownIcon } from 'vue-feather-icons'

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
    icon: {
      type: Object,
      default: () => {},
    },
  },

  components: {
    FolderIcon,
    ChevronDownIcon,
  },

  setup(props, { emit }) {
    const open = ref(false)
    const selectedItem = ref(props.items[0])

    function handleSelected(item: string) {
      selectedItem.value = item
      open.value = false
      emit('selected', { item, type: props.type })
    }
    return { open, selectedItem, handleSelected }
  },
})
</script>
