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
          v-for="(option, index) in options"
          :key="index"
          role="option"
          class="relative flex p-2 space-x-2 cursor-default select-none options-center"
          :class="[{ 'bg-brand text-primary': selectedIndex === index }]"
          @click="setSelected(option)"
          @mouseenter="selectedIndex = index"
        >
          <Icon v-if="option.icon" :icon="option.icon" size="sm" />
          <span class="text-sm">
            {{ option.translate ? t(option.text) : option.text }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { MenuOption, MenuOptionItem } from '@/types'
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
    const { t } = useI18n()
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
      emit('selected', props.options[selectedIndex.value])
    }
    return { t, selectedIndex, selectedItem, up, down, setSelected }
  },
})
</script>
