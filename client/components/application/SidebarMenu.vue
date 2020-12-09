<template>
  <div
    class="flex flex-col justify-between h-screen p-4"
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
        <div v-for="item in items" :key="item.name">
          <SidebarLink
            :item="item"
            :expanded="expanded"
            :active="selected === item.index"
            @click="setSelected(item.index)"
          />
        </div>
      </nav>
      <span
        class="absolute z-0 duration-100 ease-in transition-top rounded-xl bg-primary"
        :style="activeStyle"
      />
    </div>

    <div class="flex flex-col items-center justify-center w-full space-y-8">
      <span @click="expanded = !expanded">
        <ChevronsLeftIcon v-if="expanded" />
        <ChevronsRightIcon v-if="!expanded" />
      </span>
      <ThemeToggle />
      <div
        class="flex items-center justify-center p-2 space-x-2 rounded-lg bg-primary"
      >
        <div class="w-2/3 space-y-2">
          <span>Max Werpers</span>
          <span class="text-sm"> mw@clickbar.de</span>
        </div>
        <div class="flex space-x-2">
          <LogOutIcon size="1.25x" />
          <SettingsIcon size="1.25x" />
        </div>
      </div>
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
  SettingsIcon,
  LogOutIcon,
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
    ChevronsLeftIcon,
    ChevronsRightIcon,
    SettingsIcon,
    LogOutIcon,
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
    const expanded = ref(true)

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

    watch([current, expanded], () => {
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
      expanded,
    }
  },
})
</script>
