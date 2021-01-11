<template>
  <div
    class="rounded-md w-28 bg-primary"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <div v-if="activeMenu === 'primary'">
      <div
        v-for="item in primaryItems"
        :key="item.name"
        class="flex items-center p-2 space-x-2 rounded-md cursor-pointer hover:bg-secondary"
        @click="handleClick(item)"
      >
        <component :is="item.icon" size="1.25x" />
        <span class="text-sm">{{ item.name }}</span>
      </div>
    </div>

    <div v-if="activeMenu === 'secondary'">
      <div
        v-for="item in secondaryItems"
        :key="item.name"
        class="flex items-center p-2 space-x-2 rounded-md cursor-pointer hover:bg-secondary"
        @click="handleClick(item)"
      >
        <component :is="item.icon" size="1.25x" />
        <span class="text-sm">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

type Item = {
  name: string
  icon: any
  goto?: string
}

export default defineComponent({
  props: {
    primaryItems: {
      type: Array as () => Item[],
      default: () => [],
    },
    secondaryItems: {
      type: Array as () => Item[],
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const activeMenu = ref('primary')

    function handleClick(item: Item) {
      if (item.goto) activeMenu.value = item.goto
      else emit('click', item)
    }
    return { activeMenu, handleClick }
  },
})
</script>
