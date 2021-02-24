<template>
  <div>
    <nav class="hidden space-y-2" :class="expanded ? 'lg:block ' : 'sm:block'">
      <SidebarLink
        v-for="item in items"
        :key="item.text"
        :item="item"
        :expanded="expanded"
      />
    </nav>

    <button
      class="w-full"
      :class="expanded ? 'xl:hidden' : 'sm:hidden'"
      @click="open = !open"
    >
      <SelectMenu
        v-model:open="open"
        :options="items"
        :selected="items[0]"
        display
        @selected="handleSelected"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { MenuOption, MenuOptionItem } from '@/types'
import { useRouter } from 'vue-router'

defineProps<{
  items: MenuOption
  expanded?: boolean
}>()
const { push } = useRouter()
const open = ref(false)
function handleSelected({ info }: MenuOptionItem) {
  push(info!)
}
</script>
