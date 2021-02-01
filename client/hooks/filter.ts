import { reactive } from '@nuxtjs/composition-api'
import { Filter, Filters } from '../types'

export function useFilter() {
  const filters = reactive<Filter>({
    preview: true,
    categories: undefined,
    date: undefined,
    list: undefined,
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
        filters.list = item as string

        break
      default:
        break
    }
  }

  return { filters, setFilters }
}
