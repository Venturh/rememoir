<template>
  <div v-click-outside="handleClickOutside">
    <IconOnlyButton
      class="relative flex items-center w-full h-full py-2 focus:outline-none"
      :class="[
        { 'border border-borderPrimary shadow-sm': border },
        iconOnly ? '' : border ? 'px-4' : 'px-2',
        !selected && items.length > 0 ? 'justify-between' : 'justify-center',
        { 'bg-primary': bg },
      ]"
      @click="onChange"
    >
      <div
        class="flex items-center truncate"
        :class="iconOnly ? 'px-2' : 'space-x-2 '"
      >
        <component
          :is="icon || selected.icon"
          class="flex-shrink-0"
          size="1x"
        />
        <p class="text-sm">
          {{
            selectedItem.translate ? $t(selectedItem.text) : selectedItem.text
          }}
        </p>
      </div>

      <ChevronDownIcon
        v-if="!iconOnly"
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
      :open="open || show"
      :options="items"
      :optional-item="optionalItem"
      :selected="selected"
      with-icons
      @selected="handleSelected"
    />
    <div
      v-else-if="(items.length === 0 && open) || show"
      class="absolute z-50 top-8"
    >
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
    border: {
      type: Boolean,
      default: true,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    FolderIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  },

  setup(props, { emit }) {
    const open = ref(props.show)
    const selectedItem = ref(
      props.selected ||
        props.optionalItem ||
        props.items[0] || { text: ' ', icon: null, info: '' }
    )
    const dropdownRef = ref<HTMLDivElement>()
    const wrapperRef = ref<HTMLDivElement>()

    function onChange() {
      if (props.disabled) return
      open.value = !open.value
      emit('change', open.value)
    }

    function handleSelected(item: MenuOptionItem) {
      open.value = false
      selectedItem.value = item
      emit('selected', {
        item: item.info ? item.info : item.text,
        type: props.type,
      })
    }

    function handleClickOutside() {
      open.value = false
    }

    watch(
      () => props.optionalItem,
      (item) => {
        selectedItem.value = item || props.items[0]
      }
    )

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
