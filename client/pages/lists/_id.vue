<template>
  <div
    class="flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <div class="w-full lg:w-screen lg:max-w-lg">
      <div v-if="loading" class="space-y-2">
        <div
          v-for="i in 4"
          :key="i"
          class="flex flex-col justify-center h-64 pl-4 space-y-4 bg-secondary"
        >
          <Loading class="w-3/4 h-1/4 bg-primary" type="skeleton" />
          <Loading class="w-3/4 h-1/2 bg-primary" type="skeleton" />
        </div>
      </div>

      <div v-if="list" class="relative space-y-4">
        <BaseList :list="list" />

        <NotFound
          v-if="!loading && list.entries.length === 0"
          class="mt-20"
          target="entries"
        />
        <BaseEntry
          v-for="entry in list.entries"
          v-else
          :key="entry.id"
          :entry="entry"
        />
        <BaseListActions
          :list-id="list.id"
          :list="list"
          :show-menu="showMenu"
        />
      </div>
    </div>
    <div class="w-full space-y-2 lg:w-80">
      <!-- <Filters @filter="setFilters" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
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
    if (!id) redirectOnError()
    const { list, subscribe, loading } = useList($db, id)

    onMounted(async () => {
      await subscribe()
      if (list.value === null) redirectOnError()
    })

    function redirectOnError() {
      return error({ statusCode: 404, message: 'Not found' })
    }

    return { list, showMenu, loading }
  },
})
</script>
