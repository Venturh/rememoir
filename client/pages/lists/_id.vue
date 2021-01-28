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

        <NotFound v-if="!loading && !entries" class="mt-20" target="entries" />
        <div v-else>
          <div v-for="date in keys(entries)" :key="date" class="space-y-2">
            <div class="px-2 py-1 text-lg font-medium rounded-md bg-secondary">
              {{ date }}
            </div>
            <BaseEntry
              v-for="entry in entries[date]"
              :key="entry.id"
              :entry="entry"
              :show-preview="showPreview"
            />
          </div>
        </div>

        <BaseListActions
          :list-id="list.id"
          :list="list"
          :show-menu="showMenu"
        />
      </div>
    </div>
    <div class="w-full space-y-2 lg:w-80">
      <Filters @filter="setFilters" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { keys } from 'lodash'
import { useFilter, useList } from '@/hooks'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { route, error, app } = useContext()
    const { $db } = app
    const { filters, setFilters } = useFilter()
    const showMenu = ref(false)
    const showPreview = ref(true)
    const { id } = route.value.params
    const { list, entries, subscribe, loading } = useList($db, id, filters)

    watch(
      () => [filters.preview, filters.date, filters.categories],
      (filter) => {
        showPreview.value = filter[0] as boolean
      }
    )

    onMounted(async () => {
      await subscribe()
      if (list.value === null || !id) redirectOnError()
    })

    function redirectOnError() {
      return error({ statusCode: 404, message: 'Not found' })
    }

    return {
      list,
      entries,
      showMenu,
      loading,
      filters,
      setFilters,
      keys,
      showPreview,
    }
  },
})
</script>
