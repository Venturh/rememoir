<template>
  <div>
    <div v-if="list" class="relative space-y-4">
      <BaseList :list="list" />
      <BaseEntry v-for="entry in list.entries" :key="entry.id" :entry="entry" />
      <BaseListActions :list-id="list.id" :list="list" :show-menu="showMenu" />
    </div>
    <p v-else>Loading</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { MoreVerticalIcon } from 'vue-feather-icons'
import { useList } from '@/hooks'

export default defineComponent({
  middleware: ['authenticated'],
  components: {
    MoreVerticalIcon,
  },
  setup() {
    const { route, error, app } = useContext()
    const { $db } = app
    const showMenu = ref(false)
    const { id } = route.value.params
    if (!id) return error({ statusCode: 404, message: 'Not found' })
    const { list, execute } = useList($db, id)

    execute()

    return { list, showMenu }
  },
})
</script>
