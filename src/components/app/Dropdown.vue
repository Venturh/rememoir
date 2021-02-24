<template>
  <div>
    <IconOnlyButton
      class="relative flex items-center w-full h-full p-2 focus:outline-none"
      :class="[
        border ? 'border border-borderPrimary shadow-sm' : '',
        !selected && items.length > 0 ? 'justify-between' : 'justify-center',
      ]"
      @click="open = !open"
    >
      <div class="flex items-center space-x-2 truncate">
        <Icon
          v-if="icon || selected?.icon"
          :icon="icon || selected?.icon"
          size="sm"
        />
        <p class="text-sm">{{ text }}</p>
      </div>

      <Icon
        :icon="RiArrowDownSLine"
        class="flex-shrink-0"
        :class="
          open
            ? 'rotate-180 transform duration-200'
            : 'rotate-0 transform duration-200'
        "
        size="sm"
      />
    </IconOnlyButton>
    <SelectMenu
      v-if="items.length > 0"
      v-model:open="open"
      :options="items"
      :optional-item="optionalItem"
      :selected="selected"
      @selected="handleSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmit, defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RiArrowDownSLine } from 'vue-remix-icons'

import type { MenuOption, MenuOptionItem } from '@/types'

const props = defineProps<{
  items: MenuOption
  optionalItem?: MenuOptionItem
  type?: string
  icon?: Object
  selected?: MenuOptionItem
  border?: boolean
}>()

const emit = defineEmit(['change', 'selected'])

const { t } = useI18n()
const open = ref(false)
const selectedItem = ref(
  props.selected || props.optionalItem || props.items[0] || undefined
)

const text = computed(() =>
  selectedItem.value.translate
    ? t(selectedItem.value.text)
    : selectedItem.value.text
)

function handleSelected(item: MenuOptionItem) {
  selectedItem.value = item
  emit('selected', {
    item: item.info ? item.info : item.text,
    type: props.type,
  })
}

watch(
  () => props.optionalItem,
  (item) => {
    selectedItem.value = item || props.items[0]
  }
)
</script>
