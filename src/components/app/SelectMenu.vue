<template>
  <div>
    <button
      v-if="display && selectedItem"
      type="button"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      class="relative inline-flex w-full py-2 pl-3 pr-10 space-x-2 text-left border rounded-md shadow-sm cursor-default bg-primary border-borderPrimary focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm"
      @keydown.enter.prevent="$emit('update:open', true)"
    >
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
    <div v-if="open" v-click-outside="cancel" class="relative">
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
          class="overflow-auto text-base rounded-md bg max-h-60 ring-1 ring-borderPrimary ring-opacity-5 focus:outline-none sm:text-sm"
          @keydown.down.prevent="keydown('down')"
          @keydown.up.prevent="keydown('up')"
          @keydown.enter.prevent="enter"
          @keydown.esc.prevent="cancel"
        >
          <li
            v-for="(option, index) in options"
            :key="index"
            role="option"
            class="relative flex px-4 py-2 space-x-2 cursor-default select-none options-center"
            :class="[{ 'bg-brand25 text-primary': selectedIndex === index }]"
            @click.stop="setSelected()"
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

<script setup lang="ts">
import { ref, watch, defineEmit, defineProps, nextTick, onUpdated } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMenuNavigation } from '@/hooks'
import type { MenuOption, MenuOptionItem } from '@/types'

const props = defineProps<{
  name?: string
  open?: boolean
  options: MenuOption
  optionalItem?: MenuOptionItem
  selected?: MenuOptionItem
  display?: boolean
}>()

const emit = defineEmit(['selected', 'update:open', 'cancel'])

const { t } = useI18n()
const selectedItem = ref<MenuOptionItem | null>(props.selected || null)

const {
  menuRef,
  keydown,
  enter,
  selectedIndex,
  setSelectedIndex,
  setMaxLength,
} = useMenuNavigation(props.options.length, () => setSelected())

function cancel() {
  emit('update:open', false)
  emit('cancel')
}

function setSelected() {
  emit('update:open', false)
  selectedItem.value = props.options[selectedIndex.value]
  emit('selected', props.options[selectedIndex.value])
}

watch(
  () => props.options,
  (options) => {
    setMaxLength(options.length)
  }
)

onUpdated(() => {
  nextTick(() => {
    menuRef.value?.focus()
  })
})
</script>
