import { computed, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import _, { groupBy } from 'lodash'
import { RxDocument } from 'rxdb'
import { MyDatabase } from '../db'
import { ListInput } from '../generated/graphql'
import { Filter } from '../types'

export function useLists(db: MyDatabase) {
  const listsLoading = ref(true)
  const lists = ref()
  const listsAmount = ref()
  const selector = ref({})
  const select = ref()

  setListSelector({})

  function setListSelector({
    date,
    categories,
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
    } else if (categories) {
      selector.value = { categories: { $in: [categories] } }
    }

    const sort = {}
    sort[sortBy] = order
    select.value = db.lists
      .find({
        selector: selector.value,
      })
      .sort(sort)
  }

  function subscribeList() {
    listsLoading.value = true
    select.value.$.subscribe((results: RxDocument[]) => {
      listsAmount.value = results.length
      const grouped = groupBy(results, (result: ListInput) => {
        return dayjs(parseInt(result.updatedAt)).calendar()
      })
      listsLoading.value = false
      lists.value = grouped
    })
  }

  return { lists, listsLoading, subscribeList, setListSelector, listsAmount }
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
  db.lists.findOne({ selector: { id } }).$.subscribe((result) => {
    loading.value = true
    list.value = result
    loading.value = false
  })

  return { list, loading }
}
