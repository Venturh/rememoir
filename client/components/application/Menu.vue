<template>
  <div
    class="w-32 rounded-md bg-primary"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <div v-if="activeMenu === 'primary'" class="">
      <div
        v-for="item in primaryItems"
        :key="item.name"
        class="flex items-center w-full px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-secondary"
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
  action: string
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
      else emit('click', item.action)
    }
    return { activeMenu, handleClick }
  },
})
</script>
