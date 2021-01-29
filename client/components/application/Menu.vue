<template>
  <div
    class="z-50 w-32 rounded-md bg-primary"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <div v-if="activeMenu === 'primary'" class="">
      <div
        v-for="item in primaryItems"
        :key="item.name"
        class="flex items-center w-full px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-brand hover:text-white"
        @click.stop="handleClick(item)"
      >
        <component :is="item.icon" size="1.25x" />
        <span class="text-sm">{{ $t(item.name) }}</span>
      </div>
    </div>

    <div v-if="activeMenu === 'secondary'">
      <div
        v-for="item in secondaryItems"
        :key="item.name"
        class="flex items-center p-2 space-x-2 rounded-md cursor-pointer hover:bg-brand hover:text-white"
        @click.stop="handleClick(item)"
      >
        <component :is="item.icon" size="1.25x" />
        <span class="text-sm">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { HoverMenuItem } from '@/types'
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    primaryItems: {
      type: Array as () => HoverMenuItem[],
      default: () => [],
    },
    secondaryItems: {
      type: Array as () => HoverMenuItem[],
      default: () => [],
    },
  },
  setup(_, { emit }) {
    const activeMenu = ref('primary')

    function handleClick(item: HoverMenuItem) {
      if (item.goto) activeMenu.value = item.goto
      emit('click', { name: item.name, info: item.info })
    }
    return { activeMenu, handleClick }
  },
})
</script>
