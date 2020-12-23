<template>
  <div class="flex flex-col-reverse space-x-6 lg:flex-row lg:justify-between">
    <div class="sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 v-if="awaitReplication">Waiting for awaitReplication</h1>
      <div v-if="entries" class="space-y-2">
        <div v-for="date in Object.keys(entries)" :key="date" class="space-y-2">
          <div class="px-2 py-1 text-lg font-medium rounded-md bg-secondary">
            {{ date }}
          </div>
          <BaseEntry
            v-for="(entry, index) in entries[date]"
            :key="index"
            class="mx-auto max-w-xsm sm:max-w-md md:max-w-lg lg:max-w-xl"
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
    <div>Kalender und Filters</div>
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
import { queryEntries } from '@/db'
import { EntryInput } from '@/generated/graphql'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { $db, $dayjs } = useContext().app
    const entries = ref()
    const awaitReplication = ref(true)

    onMounted(async () => {
      const query = await queryEntries($db)

      query.$.subscribe((results) => {
        awaitReplication.value = true
        entries.value = groupBy(results, (result: EntryInput) =>
          $dayjs(parseInt(result.updatedAt)).calendar()
        )
        awaitReplication.value = false
      })

      awaitReplication.value = false
    })

    return { entries, awaitReplication }
  },
})
</script>
