import { ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { groupBy, isEqual } from 'lodash'
import { RxDocument } from 'rxdb'
import { MyDatabase } from '../db'
import { EntryInput } from '../generated/graphql'
import { Filter, Order } from '../types'

export function useEntries(db: MyDatabase) {
  const entriesLoading = ref(true)
  const entries = ref()
  const allEntries = ref<EntryInput[]>([])
  const entriesAmount = ref(0)
  const selector = ref({})
  const select = ref()
  const sort = ref({})

  setEntriesSelector({})

  function setEntriesSelector({
    date,
    categories,
    order = Order.UPDATED_DESC,
  }: Filter) {
    selector.value = {}
    sort.value = {}
    if (date) {
      selector.value = {
        calendarDate: {
          $eq: dayjs(date).format('DD.MM.YY'),
        },
      }
      if (categories)
        selector.value = {
          ...selector.value,
          categories: { $in: [categories] },
        }
    } else if (categories) {
      selector.value = { categories: { $in: [categories] } }
    }

    const sorting = order.split('_')
    sort.value[sorting[0]] = sorting[1]
  }

  function subscribeEntries({ ids }: { ids?: string[] }) {
    if (ids) selector.value = { ...selector.value, id: { $in: ids } }

    select.value = db.entries
      .find({
        selector: selector.value,
      })
      .sort(sort.value)

    entriesLoading.value = true
    select.value.$.subscribe((results: EntryInput[]) => {
      entriesLoading.value = false

      allEntries.value = results

      entriesAmount.value = allEntries.value.length
      entries.value = groupBy(allEntries.value, (result: EntryInput) => {
        return dayjs(parseInt(result.updatedAt)).calendar()
      })
    })
  }

  return {
    entries,
    entriesLoading,
    subscribeEntries,
    setEntriesSelector,
    entriesAmount,
  }
}
