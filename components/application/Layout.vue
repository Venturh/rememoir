<template>
  <div
    class="relative flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <div class="w-full space-y-2 sm:space-y-4 lg:w-screen lg:max-w-lg">
      <TabNavigation
        class="hidden md:flex"
        :amount="[entriesAmount, listsAmount]"
      />
      <NotFound
        v-if="!loading && Object.keys(content).length === 0"
        class="mt-20"
        :target="type"
      />
      <div v-if="content">
        <div v-for="date in Object.keys(content)" :key="date" class="space-y-2">
          <div class="py-1 text-lg font-medium border-borderPrimary">
            {{ date }}
          </div>
          <div ref="scrolLRef" class="space-y-4">
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

    <Filters
      :is-list-filter="type === 'lists'"
      :amount="[entriesAmount, listsAmount]"
      :filters-count="filtersCount"
      @filter="setFilters"
    />
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
import { useEntries, useFilter, useLists, useScroll } from '@/hooks'

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

    const { filters, setFilters, filtersCount } = useFilter()
    if (type !== 'entries' && type !== 'lists') {
      type = 'entries'
    }
    // const { scrolLRef } = useScroll(() => loadMoreEntries())
    const {
      entries,
      subscribeEntries,
      setEntriesSelector,
      entriesLoading,
      entriesAmount,
    } = useEntries($db)

    const {
      lists,
      listsLoading,
      subscribeList,
      setListSelector,
      listsAmount,
    } = useLists($db)

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
          subscribeEntries({})
        } else {
          setListSelector(filter)
          subscribeList()
        }
      },
      { deep: true }
    )

    onMounted(() => {
      subscribeEntries({})
      subscribeList()
    })

    onUnmounted(() => {
      setFilters({ type: 'reset', item: '' })
    })

    return {
      type,
      content,
      entriesLoading,
      entriesAmount,
      filters,
      setFilters,
      showPreview,
      BaseEntry,
      BaseList,
      entries,
      lists,
      listsAmount,
      loading,
      filtersCount,
    }
  },
})
</script>
