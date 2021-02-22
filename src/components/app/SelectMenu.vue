//TODO Keyboard Navigation scroll
<template>
  <div v-show="open" class="relative">
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
</template>

<script lang="ts">
import { useMenuNavigation } from '@/hooks'
import { MenuOption, MenuOptionItem } from '@/types'
import { defineComponent, PropType, ref, toRefs, watch } from 'vue'
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
  emits: ['selected'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const selectedItem = ref<MenuOptionItem>()
    const {
      menuRef,
      keydown,
      enter,
      selectedIndex,
      setSelectedIndex,
      setMaxLength,
    } = useMenuNavigation(props.options.length, () => setSelected())

    function setSelected() {
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
