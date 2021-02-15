import { reactive, ref } from 'vue'
import { Filter, Filters, Order } from '../types'
import { filterInitial } from '../config/data'

export function useFilter() {
  const filters = reactive<Filter>({
    ...filterInitial,
  })
  const filtersCount = ref(0)

  function setFilters({ type, item }: Filters) {
    switch (type) {
      case 'categories':
        filters.categories = item === 'DEFAULT' ? undefined : (item as string)
        break
      case 'preview':
        filters.preview = item as boolean
        break
      case 'date':
        filters.date = item === 'DEFAULT' ? undefined : (item as string)
        break
      case 'order':
        filters.order = item === 'DEFAULT' ? undefined : (item as Order)
        break
      case 'reset':
        Object.assign(filters, filterInitial)

        break
      default:
        break
    }
    filtersCount.value =
      Object.values(filters).filter((f) => f !== undefined).length - 1
  }

  return { filters, setFilters, filtersCount }
}
