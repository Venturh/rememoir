<template>
  <div
    class="flex flex-col justify-between h-screen p-4 transition-all duration-300 ease-in bg-secondary"
    :class="expanded ? 'w-40 md:w-64 ' : 'w-28 md:w-32'"
  >
    <div class="space-y-12">
      <div class="flex items-center justify-center flex-shrink-0 px-4">
        <img
          class="w-auto h-16"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="logo"
        />
      </div>
      <nav ref="itemsRef" class="relative space-y-8">
        <div v-for="(item, index) in items" :key="item.name">
          <SidebarLink
            :item="item"
            :expanded="expanded"
            @click="setSelected(index)"
          />
        </div>
      </nav>
      <span
        class="absolute z-0 w-2 duration-300 ease-in transition-top rounded-xl bg-primary"
        :style="activeStyle"
      />
    </div>
    <div class="flex flex-col items-center justify-center space-y-8">
      <span @click="expanded = !expanded">
        <ChevronsLeftIcon v-if="expanded" />
        <ChevronsRightIcon v-if="!expanded" />
      </span>
      <ThemeToggle />
    </div>
  </div>
</template>

<script lang="ts">
import {
  ColumnsIcon,
  ListIcon,
  HeartIcon,
  ArchiveIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'vue-feather-icons'
import { useBreakpointTailwindCSS } from 'vue-composable'
import { defineComponent, onMounted, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    ColumnsIcon,
    ListIcon,
    HeartIcon,
    ArchiveIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
  },
  setup() {
    const items = [
      { icon: ColumnsIcon, name: 'entries' },
      { icon: ListIcon, name: 'lists' },
      { icon: HeartIcon, name: 'pinned' },
      { icon: ArchiveIcon, name: 'archive' },
    ]
    const { current } = useBreakpointTailwindCSS()
    const itemsRef = ref<HTMLDivElement>()
    const selected = ref(0)
    const activeStyle = ref({ height: '0', top: '0', width: '0' })
    const expanded = ref(true)

    function setSelected(index: number) {
      selected.value = index
      const node = itemsRef.value?.children[selected.value]! as HTMLDivElement

      activeStyle.value = {
        height: node.offsetHeight + node.offsetHeight / 1.5 + 'px',
        width: node.offsetWidth + 'px',
        top: node.offsetTop + node.offsetHeight * 3 + 'px',
      }
    }

    onMounted(() => {
      setSelected(0)
    })

    watch([current, expanded], () => {
      setTimeout(() => {
        setSelected(selected.value)
      }, 600)
    })

    return {
      items,
      itemsRef,
      activeStyle,
      selected,
      setSelected,
      current,
      expanded,
    }
  },
})
</script>
