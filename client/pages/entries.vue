<template>
  <div class="flex flex-col-reverse space-x-6 md:flex-row md:justify-between">
    <div>
      <p v-if="!loading">Welcome back {{ me.email }}</p>
      <button @click="test">INSERT</button>
      <h1 v-if="awaitReplication">Waiting for awaitReplication</h1>
      <div v-if="!awaitReplication" class="space-y-2">
        <!-- Todo: v-bind="entry" throws error -->
        <BaseEntry
          v-for="(entry, index) in entries"
          :key="index"
          class="mx-auto max-w-xsm md:max-w-xl"
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
import { useResult } from '@vue/apollo-composable'
import { EntryInput, useMeQuery } from '@/generated/graphql'
import DatabaseService from '@/db/db'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { result, loading } = useMeQuery()

    const me = useResult(result, null, (data) => data.me)
    const entries = ref()
    const awaitReplication = ref(true)

    async function test() {
      const db = await DatabaseService.get()
      const id = require('bson-objectid')
      const obj: EntryInput = {
        id: id().str,
        contentText: 'Meine Playlist zu der ich code',
        contentType: 'Link',
        contentUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        // contentUrl:'https://open.spotify.com/track/1J2OlTIPluzOmf3RX8eKhT?si=vnZacwXhTEGC4Hbb95u2mg',
        categories: ['Youtube', 'Test'],
        hashedKey: 'hashed',
        calendarDate: Date().toString(),
        processing: false,
        updatedAt: Date.now().toString(),
      }
      await db.entries.insert(obj)
    }

    onMounted(async () => {
      awaitReplication.value = true
      const db = await DatabaseService.get()
      const query = db.entries.find()
      query.$.subscribe((results) => {
        entries.value = results
      })
      awaitReplication.value = false
    })

    return { me, loading, entries, test, awaitReplication }
  },
})
</script>
