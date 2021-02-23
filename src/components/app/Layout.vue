<template>
  <SplitLayout>
    <template #first>
      <h1 class="text-xl font-semibold">
        {{ target !== 'undefined' ? t(target) : '' }}
      </h1>
      <TabNavigation
        class="hidden md:flex"
        :items="['entries', 'lists']"
        :amount="[entriesAmount, listsAmount]"
        @selected="setType"
      />

      <NotFound
        v-if="!loading && Object.keys(content).length === 0"
        class="mt-20"
        :target="type"
      />
      <div v-if="content" class="space-y-6">
        <div v-for="date in Object.keys(content)" :key="date" class="space-y-4">
          <div
            class="p-2 text-lg font-semibold border rounded-md shadow-sm dark:shadow-none bg-secondary border-borderPrimary text-brand"
          >
            {{ date }}
          </div>
          <div ref="scrollRef" class="space-y-4">
            <component
              :is="type === 'entries' ? BaseEntry : BaseList"
              v-for="(data, index) in content[date]"
              :key="index"
              :show-preview="showPreview"
              :public="false"
              :entry="{
                title: data.title,
                description: data.description,
                url: data.url,
                type: data.type,
                preview: data.preview,
                categories: data.categories,
                hashedKey: data.hashedKey,
                calendarDate: data.calendarDate,
                processing: data.processing,
                updatedAt: data.updatedAt,
                deleted: data.deleted,
                pinned: data.pinned,
                archived: data.archived,
                id: data.id,
                createdAt: data.createdAt,
              }"
              :list="{
                title: data.title,
                description: data.description,
                categories: data.categories,
                hashedKey: data.hashedKey,
                calendarDate: data.calendarDate,
                processing: data.processing,
                updatedAt: data.updatedAt,
                pinned: data.pinned,
                archived: data.archived,
                deleted: data.deleted,
                id: data.id,
                entries: data.entries,
              }"
            />
          </div>
        </div>
      </div>
    </template>
    <template #second>
      <Filters
        :is-list-filter="type === 'lists'"
        :amount="[entriesAmount, listsAmount]"
        :filters-count="filtersCount"
        @filter="setFilters"
        @tabSelected="setType"
      />
    </template>
  </SplitLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, defineProps, ref, watch } from 'vue'

import { useI18n } from 'vue-i18n'
import {
  useEntries,
  useFilter,
  useLists,
  usePagination,
  useScroll,
} from '@/hooks'
import { getDb } from '@/db/Database'
import BaseList from '@/components/app/BaseList.vue'
import BaseEntry from '@/components/app/BaseEntry.vue'
import type { LayoutTarget } from '@/types'

const props = defineProps<{ target: LayoutTarget }>()
const db = getDb()
const { t } = useI18n()
const type = ref('entries')

const { filters, setFilters, filtersCount } = useFilter()

const {
  entries,
  subscribeEntries,
  setEntriesSelector,
  entriesLoading,
  entriesAmount,
  moreAvaible,
} = useEntries(db)

const {
  lists,
  listsLoading,
  subscribeList,
  setListSelector,
  listsAmount,
  moreListsAvaible,
} = useLists(db)

const { scrollRef } = useScroll(() => loadMore())
const { currentPage, next, resetPage } = usePagination()

const showPreview = ref(true)
const content = computed(() =>
  type.value === 'entries' ? entries.value : lists.value
)

function setType(val: number) {
  type.value = val === 0 ? 'entries' : 'list'
  resetPage()
  setFilters({ type: 'reset', item: '' })
}

const loading = computed(() => {
  return listsLoading.value || entriesLoading.value
})

function loadMore() {
  if (type.value === 'entries') {
    if (!moreAvaible.value) return
    next()
    subscribeEntries({ page: currentPage.value, target: props.target })
  } else {
    if (!moreListsAvaible.value) return
    next()
    subscribeList({ page: currentPage.value })
  }
}

watch(
  () => filters,
  (filter) => {
    showPreview.value = filter.preview ?? false
    resetPage()
    if (type.value === 'entries') {
      setEntriesSelector(filter)
      subscribeEntries({ reset: true, target: props.target })
    } else {
      setListSelector(filter)
      subscribeList({ target: props.target, reset: true })
    }
  },
  { deep: true }
)

onMounted(() => {
  subscribeEntries({ target: props.target })
  subscribeList({ target: props.target })
})

onUnmounted(() => {
  setFilters({ type: 'reset', item: '' })
})
</script>
