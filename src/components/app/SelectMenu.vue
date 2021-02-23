<template>
  <div>
    <button
      v-if="display"
      type="button"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      class="relative inline-flex w-full py-2 pl-3 pr-10 space-x-2 text-left border rounded-md shadow-sm cursor-default bg-primary border-borderPrimary focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm"
      @keydown.down.prevent="keydown('down')"
      @keydown.up.prevent="keydown('up')"
      @click="show = !show"
    >
      <Icon v-if="selectedItem.icon" :icon="selectedItem.icon" size="sm" />
      <span class="text-sm">
        {{ selectedItem.translate ? t(selectedItem.text) : selectedItem.text }}
      </span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>
    <div v-show="show || open" class="relative">
      <div
        class="absolute z-50 w-full mt-1 rounded-md shadow-lg bg-primary"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <ul
          ref="menuRef"
          :tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="overflow-auto text-base rounded-md bg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          @keydown.down.prevent="keydown('down')"
        >
          <li
            v-for="(option, index) in options"
            :key="index"
            role="option"
            class="relative flex p-2 space-x-2 cursor-default select-none options-center"
            :class="[{ 'bg-brand text-primary': selectedIndex === index }]"
            @click="setSelected()"
            @mouseenter="setSelectedIndex(index)"
          >
            <Icon v-if="option.icon" :icon="option.icon" size="sm" />
            <span class="text-sm">
              {{ option.translate ? t(option.text) : option.text }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMenuNavigation } from '@/hooks'
import { MenuOption, MenuOptionItem } from '@/types'
import { defineComponent, PropType, ref, shallowRef, toRefs, watch } from 'vue'
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
    display: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const selectedItem = shallowRef<MenuOptionItem>(props.selected || null)
    const show = ref(props.open || false)
    const {
      menuRef,
      keydown,
      enter,
      selectedIndex,
      setSelectedIndex,
      setMaxLength,
    } = useMenuNavigation(props.options.length, () => setSelected())

    function setSelected() {
      show.value = false
      selectedItem.value = props.options[selectedIndex.value]
      emit('selected', props.options[selectedIndex.value])
    }

    watch(
      () => props.options,
      (options) => {
        setMaxLength(options.length)
      }
    )

    return {
      t,
      show,
      selectedIndex,
      selectedItem,
      keydown,
      enter,
      menuRef,
      setSelectedIndex,
      setSelected,
    }
  },
})
</script>
