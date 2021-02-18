import { EntryInput } from '@api/resolvers/entry/types'
import { ListInput } from '@api/resolvers/list/types'
import { computed } from 'vue-demi'
import {
  RiAddCircleLine,
  RiArchiveLine,
  RiDeleteBack2Line,
  RiEdit2Line,
  RiMapPin2Line,
  RiShareLine,
} from 'vue-remix-icons'

export function usePrimaryMenu(data: any, target: 'entries' | 'lists') {
  const primaryMenu = computed(() => {
    const menu = [
      { name: data.value.pinned ? 'unpin' : 'pin', icon: RiMapPin2Line },
      { name: 'edit', icon: RiEdit2Line },
      {
        name: data.value.archived ? 'unarchive' : 'archive',
        icon: RiArchiveLine,
      },
      { name: 'delete', icon: RiDeleteBack2Line },
      {
        name: 'share',
        icon: RiShareLine,
        goto: 'secondary',
      },
    ]
    if (target === 'entries')
      menu.unshift({
        name: 'addToList',
        icon: RiAddCircleLine,
        goto: 'secondary',
      })
    return menu
  })

  return { primaryMenu }
}
