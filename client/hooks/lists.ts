import { computed, ComputedRef, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import _, { Dictionary, groupBy } from 'lodash'
import { MyDatabase } from '../db'
import { EntryInput, ListInput } from '../generated/graphql'
import { Filter } from '../types'

export function useLists(db: MyDatabase) {
  const listsLoading = ref(true)
  const lists = ref()
  const selector = ref({})

  function setListSelector({ date, categories, list }: Filter) {
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
  }

  function subscribeList() {
    const select = db.lists
      .find({ selector: selector.value })
      .sort({ updatedAt: 'desc' })
    listsLoading.value = true
    select.$.subscribe((results) => {
      const grouped = groupBy(results, (result: ListInput) => {
        return dayjs(parseInt(result.updatedAt)).calendar()
      })
      listsLoading.value = false
      lists.value = grouped
    })
  }

  return { lists, listsLoading, subscribeList, setListSelector }
}

export function useAvaibleLists(db: MyDatabase, entryId?: string) {
  const lists = ref<ListInput[]>([])
  const loading = ref()
  db.lists
    .find()
    .sort({ updatedAt: 'desc' })
    .$.subscribe((results) => {
      lists.value = results
      loading.value = true
    })

  const avaibleLists = computed(() => {
    if (lists.value.length > 0) {
      return lists.value.map((l: ListInput) => {
        const entryInList = l.entries.includes(entryId)
        return { text: l.title, info: entryInList ? 'DUPLICATE' : l.id }
      })
    } else return [{ text: 'No List', info: '' }]
  })

  return { avaibleLists, lists }
}

export function useListbyId(db: MyDatabase, id?: string) {
  const loading = ref(true)
  const list = ref<ListInput>()
  const entries = ref<Dictionary<EntryInput[]>>()

  db.lists.findOne({ selector: { id } }).$.subscribe((result) => {
    loading.value = true
    list.value = result
    filterEntries({})
    loading.value = false
  })

  async function filterEntries({ categories, date }: Filter) {
    const entr = await Promise.all(
      list.value.entries.map(
        async (id) => await db.entries.findOne({ selector: { id } }).exec()
      )
    )
    entries.value = groupBy(
      entr
        .filter((e) => {
          if (categories && !date) return e.categories.includes(categories)
          if (date && !categories)
            return e.calendarDate === dayjs(date).format('DD.MM.YY')
          if (categories && date)
            return (
              e.calendarDate === dayjs(date).format('DD.MM.YY') &&
              e.categories.includes(categories)
            )
          else return e
        })
        .sort((a, b) => parseFloat(b.updatedAt) - parseFloat(a.updatedAt)),
      (result: EntryInput) => {
        return dayjs(parseInt(result.updatedAt)).calendar()
      }
    )
  }

  return { list, entries, loading, filterEntries }
}
