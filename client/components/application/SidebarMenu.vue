<template>
  <div class="space-y-12">
    <div class="flex items-center justify-center flex-shrink-0 h-16">
      <img
        class="w-auto h-16 md:h-16"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="logo"
      />
    </div>
    <nav ref="itemsRef" class="relative space-y-8">
      <div v-for="item in items" :key="item.name">
        <SidebarLink
          :item="item"
          :active="selected === item.index"
          @click="setSelected(item.index)"
        />
      </div>
    </nav>
    <span
      class="absolute z-0 duration-100 ease-in transition-top rounded-xl bg-secondary"
      :style="activeStyle"
    />
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
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

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
  setup(props) {
    const items = [
      { index: 0, icon: ColumnsIcon, name: 'entries' },
      { index: 1, icon: ListIcon, name: 'lists' },
      { index: 2, icon: HeartIcon, name: 'pinned' },
      { index: 3, icon: ArchiveIcon, name: 'archive' },
    ]
    const { current } = useBreakpointTailwindCSS()
    const { route } = useContext()

    const itemsRef = ref<HTMLDivElement>()
    const selected = ref()
    const activeStyle = ref({ height: '0', top: '0', width: '0' })

    function setSelected(index: number, layoutChange: boolean) {
      if (index === selected.value && !layoutChange) return
      selected.value = index
      const node = itemsRef.value?.children[selected.value]! as HTMLDivElement
      activeStyle.value = {
        height: node.offsetHeight + node.offsetHeight / 1.5 + 'px',
        width: node.offsetWidth + 'px',
        top: node.offsetTop + node.offsetHeight * 3 + 'px',
      }
    }

    onMounted(() => {
      const routeName = route.value.name?.split('___')[0]
      setSelected(items.find((item) => item.name === routeName)!.index, false)
    })

    // TODO: Watching multiple props at once
    watch([current], () => {
      setTimeout(() => {
        setSelected(selected.value, true)
      }, 0)
    })

    watch(
      () => props.toggled,
      () => {
        setTimeout(() => {
          setSelected(selected.value, true)
        }, 0)
      }
    )

    return {
      items,
      itemsRef,
      activeStyle,
      selected,
      setSelected,
      current,
    }
  },
})
</script>
