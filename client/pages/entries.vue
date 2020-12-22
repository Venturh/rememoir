<template>
  <div class="flex flex-col-reverse space-x-6 lg:flex-row lg:justify-between">
    <div class="sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h1 v-if="awaitReplication">Waiting for awaitReplication</h1>

      <div
        v-for="date in Object.keys(entries)"
        v-else
        :key="date"
        class="space-y-2"
      >
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

    <div>Kalender und Filter</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { addRxPlugin } from 'rxdb/plugins/core'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { groupBy } from 'lodash'
import DatabaseService from '@/db/db'
import { EntryInput } from '@/generated/graphql'
addRxPlugin(RxDBQueryBuilderPlugin)

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const dayjs = useContext().app.$dayjs
    const entries = ref()
    const awaitReplication = ref(true)

    onMounted(async () => {
      let dbEntries = []
      awaitReplication.value = true
      const db = await DatabaseService.get()
      const query = db.entries.find().sort({ updatedAt: 'desc' })

      dbEntries = await query.exec()
      query.$.subscribe((results) => {
        dbEntries = results
      })

      entries.value = groupBy(dbEntries, (result: EntryInput) =>
        dayjs(parseInt(result.updatedAt)).calendar()
      )
      awaitReplication.value = false
    })

    return { entries, awaitReplication }
  },
})
</script>
