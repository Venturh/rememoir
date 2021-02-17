import { ref } from 'vue'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { Subscriber } from 'rxjs'
import { MyDatabase } from '../db'
import { EntryInput } from '../generated/graphql'
import { Filter, LayoutTarget, Order } from '../types'

type Subs = { page?: number; subs?: Subscriber<any> }[]

export function useEntries(db: MyDatabase) {
  const entriesLoading = ref(true)
  const entries = ref()
  const pageEntries = ref<any>({})
  const entriesAmount = ref(0)
  const selector = ref({})
  const select = ref()
  const sort = ref<any>({})
  const subscriber = ref<Subscriber<any>>()
  const perPage = 20
  const subs = ref<Subs>([])
  const moreAvaible = ref(true)

  setEntriesSelector({})

  function setEntriesSelector({
    date,
    categories,
    order = Order.CALENDER_DESC,
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

  function subscribeEntries({
    ids,
    page = 1,
    reset,
    target,
  }: {
    ids?: string[]
    page?: number
    target?: LayoutTarget
    reset?: boolean
  }) {
    if (ids) selector.value = { ...selector.value, id: { $in: ids } }
    if (target) {
      if (target === 'pinned')
        selector.value = { ...selector.value, pinned: true }
      else if (target === 'archive')
        selector.value = { ...selector.value, archived: true }
    }

    if (subscriber.value) subs.value.push({ page, subs: subscriber.value })
    if (subscriber.value && reset) {
      pageEntries.value = {}
      subs.value.forEach((e) => e.subs!.unsubscribe())
    }
    select.value = db.entries
      .find({
        selector: selector.value,
      })
      .sort(sort.value)
      .limit(perPage)
      .skip(page > 0 ? (page - 1) * perPage : 0)

    entriesLoading.value = true
    subscriber.value = select.value.$.subscribe(
      async (results: EntryInput[]) => {
        entriesLoading.value = false
        pageEntries.value[page] = results
        if (results.length < perPage) moreAvaible.value = false
        if (!moreAvaible.value) moreAvaible.value = true
        const all = Object.values(Object.values(pageEntries.value))
        const allEntries = [].concat.apply([], all)
        entries.value = groupBy(allEntries, (result: EntryInput) => {
          return result.calendarDate
        })
        entriesAmount.value = (
          await db.entries
            .find({
              selector: selector.value,
            })
            .exec()
        ).length
      }
    )
  }

  return {
    entries,
    entriesLoading,
    subscribeEntries,
    setEntriesSelector,
    entriesAmount,
    moreAvaible,
  }
}
