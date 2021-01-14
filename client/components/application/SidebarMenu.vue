<template>
  <div class="space-y-12">
    <div class="flex items-center justify-center flex-shrink-0 h-16">
      <img
        class="w-auto h-16 lg:h-16"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="logo"
      />
    </div>
    <nav ref="itemsRef" class="relative space-y-2">
      <div v-for="item in sidebarItems" :key="item.name">
        <SidebarLink :item="item" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { sidebarItems } from '@/config/data'

export default defineComponent({
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      sidebarItems,
    }
  },
})
</script>
