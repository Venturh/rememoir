import { ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { MyDatabase } from '../db'
import { EntryInput } from '../generated/graphql'
import { Filter } from '../types'

export function useEntries(db: MyDatabase) {
  const entriesLoading = ref(true)
  const entries = ref()
  const selector = ref({})

  function setEntriesSelector({ date, categories, list }: Filter) {
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
      // TODO Make this work
      if (list) selector.value = { ...selector.value, lists: { $in: [list] } }
    }
  }

  function subscribeEntries() {
    const select = db.entries
      .find({ selector: selector.value })
      .sort({ updatedAt: 'desc' })
    entriesLoading.value = true
    select.$.subscribe((results) => {
      const grouped = groupBy(results, (result: EntryInput) => {
        return dayjs(parseInt(result.updatedAt)).calendar()
      })
      entriesLoading.value = false
      entries.value = grouped
    })
  }

  return { entries, entriesLoading, subscribeEntries, setEntriesSelector }
}
