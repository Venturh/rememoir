<template>
  <AppLayout>
    <SplitLayout>
      <template #first>
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
            v-if="Object.keys(entries).length === 0"
            class="mt-20"
            :search="filtersCount > 0 && Object.keys(entries).length === 0"
            target="entries"
          />
          <div v-else>
            <div
              v-for="(date, index) in Object.keys(entries)"
              :key="index"
              class="space-y-4"
            >
              <div
                class="p-2 mt-4 text-lg font-semibold border rounded-md shadow-sm dark:shadow-none bg-secondary border-borderPrimary text-brand"
              >
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
      </template>
      <template #second>
        <Filters is-list-filter is-list-primary-filter @filter="setFilters" />
      </template>
    </SplitLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  useEntries,
  useFilter,
  useListbyId,
  usePagination,
  useScroll,
} from '@/hooks'
import { getDb } from '@/db/Database'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

const { push, currentRoute } = useRouter()
const db = getDb()
const { filters, setFilters, filtersCount } = useFilter()
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
    subscribeEntries({ ids: list.value!.entries, page: 1, reset: true })
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
</script>
