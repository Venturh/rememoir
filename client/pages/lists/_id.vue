<template>
  <div>
    <div v-if="list">
      <BaseEntry v-for="entry in list.entries" :key="entry.id" :entry="entry" />
    </div>
    <p v-else>Loading</p>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useList } from '@/hooks'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { route, error, app } = useContext()
    const { $db } = app
    const { id } = route.value.params
    if (!id) return error({ statusCode: 404, message: 'Not found' })
    const { list, execute } = useList($db, id)
    execute()

    return { list }
  },
})
</script>
