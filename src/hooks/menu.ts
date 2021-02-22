import { ref, computed } from 'vue'
import {
  RiAddCircleLine,
  RiArchiveLine,
  RiDeleteBack2Line,
  RiEdit2Line,
  RiMapPin2Line,
  RiShareLine,
} from 'vue-remix-icons'
import { HoverMenuItem } from '@/types'

export function usePrimaryMenu(data: any, target: 'entries' | 'lists') {
  const primaryMenu = computed(() => {
    const menu: HoverMenuItem[] = [
      {
        name: data.value.pinned ? 'unpin' : 'pin',
        icon: RiMapPin2Line,
        translate: true,
      },
      { name: 'edit', icon: RiEdit2Line, translate: true },
      {
        name: data.value.archived ? 'unarchive' : 'archive',
        icon: RiArchiveLine,
        translate: true,
      },
      { name: 'delete', icon: RiDeleteBack2Line, translate: true },
      {
        name: 'share',
        icon: RiShareLine,
        goto: 'secondary',
        translate: true,
      },
    ]
    if (target === 'entries')
      menu.unshift({
        name: 'addToList',
        icon: RiAddCircleLine,
        goto: 'secondary',
        translate: true,
      })
    return menu
  })

  return { primaryMenu }
}

export function useMenuNavigation(max: number, callback: () => void) {
  console.log('useMenuNavigation ~ max', max)
  const menuRef = ref<HTMLDivElement>()
  const selectedIndex = ref(0)
  const maxLength = ref(max)

  function keydown(direction: 'up' | 'down') {
    if (selectedIndex.value > 0 && direction === 'up') selectedIndex.value -= 1
    else if (selectedIndex.value < maxLength.value - 1 && direction === 'down')
      selectedIndex.value += 1

    if (selectedIndex.value < maxLength.value && selectedIndex.value > 0)
      menuRef.value?.children[selectedIndex.value].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
  }

  function enter() {
    callback()
  }

  function setSelectedIndex(index: number) {
    selectedIndex.value = index
  }
  function setMaxLength(val: number) {
    maxLength.value = val
  }
  return {
    menuRef,
    selectedIndex,
    setSelectedIndex,
    setMaxLength,
    keydown,
    enter,
  }
}
