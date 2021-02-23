<template>
  <div>
    <nav class="hidden space-y-2 sm:block">
      <SidebarLink
        v-for="item in items"
        :key="item.text"
        :item="item"
        :expanded="expanded"
      />
    </nav>

    <div class="sm:hidden">
      <SelectMenu
        :options="items"
        :selected="items[0]"
        display
        @selected="handleSelected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { MenuOption, MenuOptionItem } from '@/types'
import { useRouter } from 'vue-router'

defineProps<{
  items: MenuOption
  expanded?: boolean
}>()
const { push } = useRouter()
function handleSelected({ info }: MenuOptionItem) {
  push(info)
}
</script>
