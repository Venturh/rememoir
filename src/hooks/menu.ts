import { computed } from 'vue'
import {
  RiAddCircleLine,
  RiArchiveLine,
  RiDeleteBack2Line,
  RiEdit2Line,
  RiMapPin2Line,
  RiShareLine,
} from 'vue-remix-icons'
import { HoverMenuItem } from '@/types'

export function usePrimaryMenu(
  data: any,
  target: 'entries' | 'lists' | 'public'
) {
  const primaryMenu = computed(() => {
    if (target === 'public') return []
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
