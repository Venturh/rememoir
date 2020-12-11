<template>
  <div class="">
    <p v-if="!loading">Welcome back {{ me.email }}</p>
    <pre>{{ entries }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { useResult } from '@vue/apollo-composable'
import { useMeQuery } from '@/generated/graphql'
import DatabaseService from '@/db/db.service'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { result, loading } = useMeQuery()

    const me = useResult(result, null, (data) => data.me)
    const entries = ref()

    onMounted(async () => {
      const db = await DatabaseService.get()
      entries.value = await db.entries.find().exec()
      console.log('🚀 ~ file: default.vue ~ line 27 ~ onMounted ~ db', db)
      // await db.entries.insert({
      //   id: 'bla',
      //   text: 'text',
      //   url: 'www.test.de',
      //   type: 'Link',
      //   categories: [],
      // })
    })

    return { me, loading, entries }
  },
})
</script>
