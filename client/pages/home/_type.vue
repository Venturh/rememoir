//TODO filter
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

    <div class="w-full space-y-2 lg:w-80">
      <TabNavigation />
      <Filters @filter="setFilters" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

import { groupBy } from 'lodash'
import { queryEntries } from '@/db/entry'
import { EntryInput, ListInput } from '@/generated/graphql'
import { decryptEntry } from '@/utils/crypto'
import { Filters } from '@/types'
import { getLists } from '@/db/list'
import { RxDocument } from 'rxdb/src/types'
import BaseList from '@/components/application/BaseList.vue'
import BaseEntry from '@/components/application/BaseEntry.vue'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { $db, $dayjs } = useContext().app
    const { route } = useContext()
    let { type } = route.value.params

    if (type !== 'entries' && type !== 'lists') {
      type = 'entries'
    }
    const content = ref({})
    const showPreview = ref(true)
    const filters = reactive<{
      categories?: string
      preview: boolean
      date?: string
    }>({
      categories: undefined,
      preview: true,
      date: undefined,
    })
    const loading = ref(true)

    function setFilters({ type, item }: Filters) {
      switch (type) {
        case 'categories': {
          filters.categories = item === 'All' ? undefined : (item as string)
          break
        }
        case 'preview':
          showPreview.value = item as boolean
          break
        case 'date':
          filters.date = item as string
          break

        default:
          break
      }
    }

    watch(
      () => filters,
      async (filter) => {
        const query: any =
          type === 'entries'
            ? await queryEntries($db, {
                category: filter.categories,
                date: filter.date,
              }).exec()
            : await getLists($db, {
                category: filter.categories,
                date: filter.date,
              }).exec()
        const grouped = groupBy(query, (result: EntryInput) =>
          $dayjs(parseInt(result.updatedAt)).calendar()
        )
        content.value = grouped
      },
      { deep: true }
    )

    onMounted(() => {
      // as <<RxQuery<EntryInput, RxDocument<EntryInput, EntryDocMethods>[]>, <RxQuery<ListInput, RxDocument<ListInput, ListDocMethods>[]>>
      const query: any =
        type === 'entries' ? queryEntries($db, {}) : getLists($db, {})

      query.$.subscribe((results: RxDocument[]) => {
        loading.value = true
        const grouped = groupBy(results, (result: EntryInput | ListInput) => {
          return $dayjs(parseInt(result.updatedAt)).calendar()
        })
        content.value = grouped

        loading.value = false
      })
    })

    onUnmounted(() => {
      filters.categories = 'All'
      filters.preview = true
      filters.date = undefined
    })

    return {
      type,
      content,
      loading,
      decryptEntry,
      filters,
      setFilters,
      showPreview,
      BaseEntry,
      BaseList,
    }
  },
})
</script>
