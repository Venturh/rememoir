<template>
  <AppLayout>
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
          <BaseList :list="list" primary />

          <NotFound
            v-if="!loading && !entries"
            class="mt-20"
            target="entries"
          />
          <div v-else>
            <div v-for="date in keys(entries)" :key="date" class="space-y-2">
              <div class="py-1 text-lg font-medium">
                {{ date }}
              </div>
              <div ref="scrollRef" class="space-y-4">
                <BaseEntry
                  v-for="entry in entries[date]"
                  :key="entry.id"
                  :entry="entry"
                  :public="false"
                  :show-preview="showPreview"
                  is-list-entry
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full space-y-2 lg:w-80">
        <Filters is-list-filter is-list-primary-filter @filter="setFilters" />
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, watch } from 'vue'
import { keys } from 'lodash'
import {
  useEntries,
  useFilter,
  useListbyId,
  usePagination,
  useScroll,
} from '@/hooks'
import { getDb } from '@/db/Database'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { push, currentRoute } = useRouter()
    const db = getDb()
    const { filters, setFilters } = useFilter()
    const showPreview = ref(true)
    const id = ref(currentRoute.value.params.id as string)
    const { scrollRef } = useScroll(() => loadMore())
    const { currentPage, next, resetPage } = usePagination()
    const { list, loading, execute } = useListbyId(db, id.value)
    const {
      entries,
      subscribeEntries,
      setEntriesSelector,
      moreAvaible,
    } = useEntries(db)

    function loadMore() {
      if (!moreAvaible.value) return
      next()

      subscribeEntries({ ids: list.value!.entries, page: currentPage.value })
    }

    watch(
      () => filters,
      (filter) => {
        showPreview.value = filter.preview ?? false
        resetPage()
        setEntriesSelector(filter)
        subscribeEntries({ page: 1, reset: true })
      },
      { deep: true }
    )

    watch(
      () => list.value,
      (l) => {
        if (l === null) return redirectOnError()
        subscribeEntries({ ids: l!.entries, page: 1 })
      }
    )

    onMounted(() => {
      if (!id.value) redirectOnError()
      else execute(id.value)
    })

    function redirectOnError() {
      push('home')
    }

    onBeforeRouteUpdate((to, from, next) => {
      if (to !== from) {
        id.value = to.params.id as string
        execute(id.value)
        next()
      }
    })

    return {
      list,
      entries,
      loading,
      filters,
      setFilters,
      keys,
      showPreview,
      scrollRef,
      moreAvaible,
    }
  },
})
</script>
