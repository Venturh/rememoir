//TODO Keyboard Navigation scroll
<template>
  <div v-if="open" class="relative">
    <div
      class="absolute z-50 w-full mt-1 rounded-md shadow-lg bg-primary"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
    >
      <ul
        ref="dropdown"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-item-3"
        class="overflow-auto text-base rounded-md bg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <li
          v-if="optionalItem && selectedItem !== optionalItem"
          role="option"
          class="relative flex items-center p-2 space-x-2 cursor-default select-none"
          :class="[
            { 'bg-brand text-brandContrast': selectedIndex === -1 },
            selected && optionalItem.icon === selected.icon
              ? 'hidden'
              : 'block  space-x-0',
          ]"
          @click="setSelected(optionalItem)"
          @mouseenter="selectedIndex = -1"
        >
          <component
            :is="optionalItem.icon"
            v-if="optionalItem.icon"
            size="1.25x"
          />
          <span class="text-sm">{{ optionalItem.text }}</span>
        </li>
        <li
          v-for="(option, index) in options"
          :key="index"
          role="option"
          class="relative flex items-center p-2 space-x-2 cursor-default select-none"
          :class="[
            { 'bg-brand text-brandContrast': selectedIndex === index },
            selected && option.icon === selected.icon
              ? 'hidden'
              : 'block  space-x-0',
          ]"
          @click="setSelected(option)"
          @mouseenter="selectedIndex = index"
        >
          <component :is="option.icon" v-if="option.icon" size="1.25x" />
          <span class="text-sm">{{ option.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { MenuOption, MenuOptionItem } from '@/types'
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<MenuOption>,
      default: () => [],
    },
    optionalItem: {
      type: Object as PropType<MenuOptionItem>,
      default: () => {},
    },
    selected: {
      type: Object as PropType<MenuOptionItem>,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const selectedIndex = ref(0)
    const selectedItem = ref<MenuOptionItem>()

    function up() {
      if (selectedIndex.value > 0) selectedIndex.value -= 1
    }
    function down() {
      if (selectedIndex.value < props.options.length) selectedIndex.value += 1
    }

    function setSelected(item: MenuOptionItem) {
      selectedItem.value = item
      emit(
        'selected',
        selectedIndex.value === -1
          ? props.optionalItem
          : props.options[selectedIndex.value],
        props.name
      )
    }
    return { selectedIndex, selectedItem, up, down, setSelected }
  },
})
</script>
