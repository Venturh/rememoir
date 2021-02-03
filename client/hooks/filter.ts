import { reactive } from '@nuxtjs/composition-api'
import { Filter, Filters } from '../types'
import { filterInitial } from '../config/data'

export function useFilter() {
  const filters = reactive<Filter>({
    ...filterInitial,
  })

  function setFilters({ type, item }: Filters) {
    switch (type) {
      case 'categories':
        filters.categories = item === 'All' ? undefined : (item as string)
        break
      case 'preview':
        filters.preview = item as boolean
        break
      case 'date':
        filters.date = item as string
        break
      case 'list':
        filters.list = item === 'DEFAULT' ? undefined : (item as string)
        break
      case 'order':
        filters.order = item as 'asc' | 'desc'
        break
      case 'reset':
        Object.assign(filters, filterInitial)

        break
      default:
        break
    }
  }

  return { filters, setFilters }
}
