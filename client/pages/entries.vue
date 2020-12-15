<template>
  <div class="">
    <p v-if="!loading">Welcome back {{ me.email }}</p>
    <button @click="test">INSERT</button>
    <pre>{{ entries }}</pre>
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

    async function test() {
      const db = await DatabaseService.get()
      const id = require('bson-objectid')
      const obj: EntryInput = {
        id: id().str,
        contentText: 'Moin',
        contentType: 'Link',
        contentUrl: 'www.test.de',
        categories: ['Youtube', 'Test'],
        hashedKey: 'hashed',
        calendarDate: Date().toString(),
        processing: false,
        updatedAt: Date.now().toString(),
      }
      await db.entries.insert(obj)
    }

    onMounted(async () => {
      const db = await DatabaseService.get()
      const query = db.entries.find()
      query.$.subscribe((results) => {
        entries.value = results
      })
    })

    return { me, loading, entries, test }
  },
})
</script>
