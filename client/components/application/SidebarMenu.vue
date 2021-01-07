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
      <div v-for="item in items" :key="item.name">
        <SidebarLink :item="item" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import {
  ColumnsIcon,
  ListIcon,
  HeartIcon,
  ArchiveIcon,
} from 'vue-feather-icons'
import { useBreakpointTailwindCSS } from 'vue-composable'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ColumnsIcon,
    ListIcon,
    HeartIcon,
    ArchiveIcon,
  },
  setup() {
    const items = [
      { index: 0, icon: ColumnsIcon, name: 'entries' },
      { index: 1, icon: ListIcon, name: 'lists' },
      { index: 2, icon: HeartIcon, name: 'pinned' },
      { index: 3, icon: ArchiveIcon, name: 'archive' },
    ]
    const { current } = useBreakpointTailwindCSS()

    return {
      items,

      current,
    }
  },
})
</script>
