import { ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { RxDocument } from 'rxdb'
import { MyDatabase } from '../db'
import { EntryInput } from '../generated/graphql'
import { Filter } from '../types'

export function useEntries(db: MyDatabase) {
  const entriesLoading = ref(true)
  const entries = ref()
  const entriesAmount = ref()
  const selector = ref({})
  const select = ref()
  const sort = ref({})

  setEntriesSelector({})

  function setEntriesSelector({
    date,
    categories,
    list,
    order = 'desc',
    sortBy = 'updatedAt',
  }: Filter) {
    selector.value = {}
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
      if (list) selector.value = { ...selector.value, lists: { $in: [list] } }
    } else {
      if (categories) selector.value = { categories: { $in: [categories] } }
      if (list) selector.value = { ...selector.value, lists: { $in: [list] } }
    }
    sort.value[sortBy] = order
  }

  function subscribeEntries(ids?: string[]) {
    if (ids) selector.value = { ...selector.value, id: { $in: ids } }
    select.value = db.entries
      .find({
        selector: selector.value,
      })
      .sort(sort.value)
    entriesLoading.value = true
    select.value.$.subscribe((results: RxDocument[]) => {
      entriesAmount.value = results.length
      const grouped = groupBy(results, (result: EntryInput) => {
        return dayjs(parseInt(result.updatedAt)).calendar()
      })
      entriesLoading.value = false
      entries.value = grouped
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
