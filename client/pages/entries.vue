<template>
  <div
    class="flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <h1 v-if="awaitReplication">Waiting for awaitReplication</h1>
    <div class="lg:w-screen lg:max-w-lg">
      <div v-if="entries" class="grid gap-4">
        <div v-for="date in Object.keys(entries)" :key="date" class="">
          <!-- <div dark
            class="relative flex-shrink-0 w-3.5 h-3.5 rounded-full bg-brand -left-2 top-3.5"
          /> -->
          <div>
            <div class="px-2 py-1 text-lg font-medium rounded-md bg-secondary">
              {{ date }}
            </div>
            <div class="mt-2 space-y-2">
              <BaseEntry
                v-for="(entry, index) in entries[date]"
                :key="index"
                :show-preview="showPreview"
                v-bind="{
                  contentText: entry.contentText,
                  contentUrl: entry.contentUrl,
                  contentType: entry.contentType,
                  contentPreview: entry.contentPreview,
                  categories: entry.categories,
                  hashedKey: entry.hashedKey,
                  calendarDate: entry.calendarDate,
                  processing: entry.processing,
                  updatedAt: entry.updatedAt,
                  id: entry.id,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Filters @filter="setFilters" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

import { groupBy } from 'lodash'
import { queryEntries } from '@/db/entry'
import { EntryInput } from '@/generated/graphql'
import { decryptEntry } from '@/utils/crypto'
import { categories } from '@/config/data'
import { Filters } from '@/types'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { $db, $dayjs } = useContext().app
    const entries = ref()
    const showPreview = ref(true)
    const filters = reactive<{
      categories: string
      preview: boolean
      date?: string
    }>({
      categories: 'All',
      preview: true,
      date: undefined,
    })
    const awaitReplication = ref(true)

    function setFilters({ type, item }: Filters) {
      switch (type) {
        case 'categories': {
          filters.categories = item as string
          break
        }
        case 'preview':
          showPreview.value = item as boolean
          break
        case 'date':
          filters.date = item as string
          break

        default:
          break
      }
    }

    watch(
      () => filters,
      async (filter) => {
        const query = await queryEntries($db, {
          category: filter.categories,
          date: filter.date,
        }).exec()
        const grouped = await groupBy(query, (result: EntryInput) =>
          $dayjs(parseInt(result.updatedAt)).calendar()
        )
        entries.value = grouped
      },
      { deep: true }
    )

    onMounted(async () => {
      const query = await queryEntries($db, {
        category: categories[0],
        date: undefined,
      })
      query.$.subscribe(async (results) => {
        awaitReplication.value = true
        const grouped = await groupBy(results, (result: EntryInput) =>
          $dayjs(parseInt(result.updatedAt)).calendar()
        )
        entries.value = grouped
        awaitReplication.value = false
      })
      awaitReplication.value = false
    })

    return {
      entries,
      awaitReplication,
      decryptEntry,
      filters,
      setFilters,
      showPreview,
    }
  },
})
</script>

<style>
.timeline {
  display: flex;
}
.timeline::before {
  @apply bg-brand;
  content: '';
  position: relative;

  width: 3px;
  border-radius: 2px;
  margin-top: 4em;
}

/* @media only screen and (min-width: 600px) {
  .timeline::before {
    display: flex;
  }
} */
</style>
