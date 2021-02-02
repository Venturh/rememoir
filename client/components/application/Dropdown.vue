<template>
  <div v-click-outside="handleClickOutside">
    <IconOnlyButton
      class="relative flex items-center justify-between w-full p-3 space-x-1 bg-secondary focus:outline-none"
      @click="onChange"
    >
      <div
        class="flex items-center space-x-2 truncate"
        :class="{ 'space-x-0': selected }"
      >
        <component :is="selected.icon" v-if="selected" size="1x" />
        <component :is="icon" v-else size="1x" />
        <p v-if="!selected && items.length > 0" class="text-xs">
          {{ selectedItem.text }}
        </p>
        <slot v-else class="text-xs" />
      </div>

      <ChevronDownIcon
        class="flex-shrink-0"
        :class="
          open
            ? 'rotate-180 transform duration-200'
            : 'rotate-0 transform duration-200'
        "
        size="1.25x"
      />
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
import vClickOutside from 'v-click-outside'

export default defineComponent({
  directives: {
    clickOutside: vClickOutside.directive,
  },
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
    const dropdownRef = ref<HTMLDivElement>()
    const wrapperRef = ref<HTMLDivElement>()

    function onChange() {
      open.value = !open.value
      emit('change', open.value)
    }

    function handleSelected(item: MenuOptionItem) {
      selectedItem.value = item
      open.value = false
      emit('selected', {
        item: item.info ? item.info : item.text,
        type: props.type,
      })
    }

    function handleClickOutside() {
      open.value = false
    }

    return {
      open,
      close,
      selectedItem,
      handleSelected,
      onChange,
      dropdownRef,
      wrapperRef,
      handleClickOutside,
    }
  },
})
</script>

<style lang="postcss" scoped>
.rotate-enter-active {
  animation: rotate-in 0.5s;
}
.rotate-leave-active {
  animation: rotate-in 0.5s reverse;
}
@keyframes rotate-in {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
