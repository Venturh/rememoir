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
      <button
        v-for="item in secondaryItems"
        :key="item.name"
        :disabled="item.info === 'DUPLICATE'"
        class="flex items-center w-full p-2 space-x-2 rounded-md"
        :class="
          item.info === 'DUPLICATE'
            ? 'cursor-not-allowed hover:bg-brand25'
            : 'hover:bg-brand hover:text-white cursor-pointer'
        "
        k
        @click.stop="handleClick(item)"
      >
        <component :is="item.icon" size="1.25x" />
        <span class="text-sm">{{ item.name }}</span>
      </button>
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
