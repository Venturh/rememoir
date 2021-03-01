import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { RxDocument } from 'rxdb'
import { Subscriber } from 'rxjs'
import { MyDatabase } from '../db'
import { ListInput } from '../generated/graphql'
import { Filter, LayoutTarget, Order } from '../types'

type Subs = { page?: number; subs?: Subscriber<any> }[]

export function useLists(db: MyDatabase) {
  const listsLoading = ref(true)
  const lists = ref()
  const listsAmount = ref(0)
  const selector = ref({})
  const select = ref()
  const subscriber = ref<Subscriber<any>>()
  const sort = {}
  const perPage = 20
  const subs = ref<Subs>([])
  const moreListsAvaible = ref(true)
  const pageLists = ref({})

  setListSelector({})

  function setListSelector({
    date,
    categories,
    order = Order.CALENDER_DESC,
  }: Filter) {
    if (subscriber.value) {
      subscriber.value.unsubscribe()
    }
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

    const sorting = order.split('_')
    sort[sorting[0]] = sorting[1]
  }

  function subscribeList({
    page = 1,
    target,
    reset,
  }: {
    page?: number
    target?: LayoutTarget
    reset?: boolean
  }) {
    listsLoading.value = true
    if (target === 'pinned')
      selector.value = { ...selector.value, pinned: true, archived: false }
    else if (target === 'archive')
      selector.value = { ...selector.value, archived: true }
    else if (target === 'undefined') {
      selector.value = { ...selector.value, archived: false }
    }
    if (subscriber.value) subs.value.push({ page, subs: subscriber.value })
    if (subscriber.value && reset) {
      pageLists.value = {}
      subs.value.forEach((e) => e.subs.unsubscribe())
    }
    select.value = db.lists
      .find({
        selector: selector.value,
      })
      .sort(sort)
      .limit(perPage)
      .skip(page > 0 ? (page - 1) * perPage : 0)
    subscriber.value = select.value.$.subscribe(
      async (results: RxDocument[]) => {
        listsAmount.value = results.length
        const grouped = groupBy(results, (result: ListInput) => {
          return result.calendarDate
        })
        listsLoading.value = false
        lists.value = grouped

        listsLoading.value = false

        pageLists.value[page] = results
        if (results.length < perPage) moreListsAvaible.value = false
        if (!moreListsAvaible.value) moreListsAvaible.value = true
        const all = Object.values(Object.values(pageLists.value))
        const allLists = [].concat.apply([], all)
        lists.value = groupBy(allLists, (result: ListInput) => {
          return dayjs(parseInt(result.calendarDate)).calendar()
        })
        listsAmount.value = (
          await db.lists
            .find({
              selector: selector.value,
            })
            .exec()
        ).length
      }
    )
  }

  return {
    lists,
    listsLoading,
    subscribeList,
    setListSelector,
    listsAmount,
    moreListsAvaible,
  }
}

export function useAvaibleLists(db: MyDatabase, entryId?: string) {
  const lists = ref<ListInput[]>([])
  const loading = ref()

  onMounted(async () => {
    lists.value = await db.lists
      .find()
      .sort({ updatedAt: 'desc' })

      .exec()
  })

  const avaibleLists = computed(() => {
    if (lists.value.length > 0) {
      const avaible = lists.value.map((l: ListInput) => {
        const entryInList = entryId ? l.entries.includes(entryId) : undefined
        return {
          text: l.title,
          info: entryInList ? 'DUPLICATE' : l.id,
          translate: false,
        }
      })
      return avaible
    } else
      return [{ text: 'no_lists_avaible', info: 'DEFAULT', translate: true }]
  })

  return { avaibleLists, lists }
}

export function useListbyId(db: MyDatabase, id?: string) {
  const loading = ref(true)
  const list = ref<ListInput>()
  const subs = ref()

  function execute(id: string) {
    if (subs.value) subs.value.unsubscribe()
    subs.value = db.lists
      .findOne({ selector: { id } })
      .$.subscribe((result) => {
        loading.value = true
        list.value = result as ListInput
        loading.value = false
      })
  }

  return { list, loading, execute }
}
