<template>
  <div
    class="relative flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
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
      <NotFound
        v-if="!loading && Object.keys(content).length === 0"
        class="mt-20"
        :target="type"
      />
      <div v-if="!loading" class="grid gap-4">
        <div v-for="date in Object.keys(content)" :key="date" class="">
          <div>
            <div class="px-2 py-1 text-lg font-medium rounded-md bg-secondary">
              {{ date }}
            </div>
            <div class="mt-2 space-y-2">
              <component
                :is="type === 'entries' ? BaseEntry : BaseList"
                v-for="(data, index) in content[date]"
                :key="index"
                :show-preview="showPreview"
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
                  id: data.id,
                  createdAt: data.createdAt,
                  lists: data.lists,
                }"
                :list="{
                  title: data.title,
                  description: data.description,
                  categories: data.categories,
                  hashedKey: data.hashedKey,
                  calendarDate: data.calendarDate,
                  processing: data.processing,
                  updatedAt: data.updatedAt,
                  deleted: data.deleted,
                  id: data.id,
                  entries: data.entries,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Filters @filter="setFilters" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

import BaseList from '@/components/application/BaseList.vue'
import BaseEntry from '@/components/application/BaseEntry.vue'
import { useEntries, useFilter, useLists } from '@/hooks'

export default defineComponent({
  props: {
    target: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { $db } = useContext().app
    const { route } = useContext()
    let { type } = route.value.params

    const { filters, setFilters } = useFilter()
    if (type !== 'entries' && type !== 'lists') {
      type = 'entries'
    }
    const {
      entries,
      subscribeEntries,
      setEntriesSelector,
      entriesLoading,
    } = useEntries($db)

    const { lists, listsLoading, subscribeList, setListSelector } = useLists(
      $db
    )

    const showPreview = ref(true)
    const content = computed(() =>
      type === 'entries' ? entries.value : lists.value
    )
    const loading = computed(() => {
      return listsLoading.value || entriesLoading.value
    })

    watch(
      () => filters,
      (filter) => {
        showPreview.value = filter.preview ?? false
        if (type === 'entries') {
          setEntriesSelector(filter)
          subscribeEntries()
        } else {
          setListSelector(filter)
          subscribeList()
        }
      },
      { deep: true }
    )

    onMounted(() => {
      subscribeEntries()
      subscribeList()
    })

    onUnmounted(() => {
      filters.categories = 'All'
      filters.preview = true
      filters.date = undefined
    })

    return {
      type,
      content,
      entriesLoading,
      filters,
      setFilters,
      showPreview,
      BaseEntry,
      BaseList,
      entries,
      lists,
      loading,
    }
  },
})
</script>
