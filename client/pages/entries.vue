<template>
  <div
    class="flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <div class="sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 v-if="awaitReplication">Waiting for awaitReplication</h1>
      <div v-if="entries" class="grid gap-4">
        <div v-for="date in Object.keys(entries)" :key="date" class="">
          <!-- <div dark
            class="relative flex-shrink-0 w-3.5 h-3.5 rounded-full bg-brand -left-2 top-3.5"
          /> -->
          <div>
            <div class="px-2 py-1 text-lg font-medium rounded-md bg-secondary">
              {{ date }}
            </div>
            <div class="mt-3 space-y-3">
              <BaseEntry
                v-for="(entry, index) in entries[date]"
                :key="index"
                class="mx-auto max-w-xsm sm:max-w-md md:max-w-lg lg:max-w-xl"
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
    <Filters class="mb-2 lg:mb-0" @filter="setFilters" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
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
    const filters = ref<{ categories: string; preview: boolean }>({
      categories: '',
      preview: true,
    })
    const awaitReplication = ref(true)

    async function setFilters({ type, item }: Filters) {
      switch (type) {
        case 'categories': {
          filters.value.categories = item as string
          const query = await queryEntries($db, filters.value.categories).exec()
          const grouped = await groupBy(query, (result: EntryInput) =>
            $dayjs(parseInt(result.updatedAt)).calendar()
          )
          entries.value = grouped
          break
        }
        case 'preview':
          showPreview.value = item as boolean
          break

        default:
          break
      }
    }

    onMounted(async () => {
      const query = await queryEntries($db, categories[0])
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
