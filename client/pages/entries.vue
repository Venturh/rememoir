<template>
  <div class="flex flex-col-reverse space-x-6 lg:flex-row lg:justify-between">
    <div>
      <h1 v-if="awaitReplication">Waiting for awaitReplication</h1>
      <div v-else class="space-y-2">
        <!-- Todo: v-bind="entry" throws error -->
        <BaseEntry
          v-for="(entry, index) in entries"
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
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import DatabaseService from '@/db/db'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const entries = ref()
    const awaitReplication = ref(true)

    onMounted(async () => {
      awaitReplication.value = true
      const db = await DatabaseService.get()
      const query = db.entries.find()
      query.$.subscribe((results) => {
        entries.value = results
      })
      awaitReplication.value = false
    })

    return { entries, awaitReplication }
  },
})
</script>
