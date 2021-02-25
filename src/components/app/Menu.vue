<template>
  <div
    ref="hoverMenu"
    v-click-outside="onClickOutside"
    class="relative z-50 w-48 overflow-y-auto rounded-md shadow-sm max-h-96 bg-primary ring-1 ring-borderPrimary"
    :style="style"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <div v-if="activeMenu === 'primary'" class="">
      <button
        v-for="item in primaryItems"
        :key="item.text"
        class="flex items-center w-full px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-brand25 hover:text-primary"
        @click.stop="handleClick(item)"
      >
        <Icon :icon="item.icon" size="sm" />
        <span class="text-sm truncate">
          {{ item.translate ? t(item.text) : item.text }}
        </span>
      </button>
    </div>

    <div v-if="activeMenu === 'secondary'">
      <button
        v-for="item in secondaryItems"
        :key="item.text"
        :disabled="item.info === 'DUPLICATE'"
        class="flex items-center w-full p-2 space-x-2 rounded-md"
        :class="
          item.info === 'DUPLICATE'
            ? 'cursor-not-allowed hover:bg-brand25'
            : 'hover:bg-brand25 hover:text-primary cursor-pointer'
        "
        @click.stop="handleClick(item)"
      >
        <Icon :icon="item.icon" size="sm" />
        <span class="text-sm truncate">
          {{ item.translate ? t(item.text) : item.text }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmit, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

import type { MenuOption, MenuOptionItem } from '@/types'

defineProps<{ primaryItems: MenuOption; secondaryItems: MenuOption }>()
const emit = defineEmit([
  'click',
  'mouseleave',
  'mouseover',
  'update:modelValue',
])

const { t } = useI18n()
const hoverMenu = ref<HTMLDivElement>()
const style = ref({ top: '0' })
const activeMenu = ref('primary')

function onClickOutside() {
  emit('update:modelValue', false)
}

function handleClick(item: MenuOptionItem) {
  if (item.goto) activeMenu.value = item.goto
  emit('click', { text: item.text, info: item.info })
}
onMounted(() => {
  if (
    window.innerHeight - hoverMenu.value!.getBoundingClientRect().top <
    hoverMenu.value!.clientHeight
  )
    style.value.top = '-15rem'
})
</script>
