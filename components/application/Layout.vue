<template>
  <div
    class="relative flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <div class="w-full space-y-2 sm:space-y-4 lg:w-screen lg:max-w-lg">
      <TabNavigation
        class="hidden md:flex"
        :amount="[entriesAmount, listsAmount]"
        @selected="setType"
      />

      <NotFound
        v-if="!loading && Object.keys(content).length === 0"
        class="mt-20"
        :target="type"
      />
      <div v-if="content" class="space-y-6">
        <div v-for="date in Object.keys(content)" :key="date" class="space-y-2">
          <div class="py-1 text-lg font-medium border-borderPrimary">
            {{ date }}
          </div>
          <div ref="scrollRef" class="space-y-4">
            <component
              :is="type === 'entries' ? BaseEntry : BaseList"
              v-for="(data, index) in content[date]"
              :key="index"
              :show-preview="showPreview"
              :entry="data"
              :list="data"
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
      @tabSelected="setType"
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
import {
  useEntries,
  useFilter,
  useLists,
  usePagination,
  useScroll,
} from '@/hooks'

export default defineComponent({
  props: {
    target: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { $db } = useContext().app
    const type = ref('entries')

    const { filters, setFilters, filtersCount } = useFilter()

    const {
      entries,
      subscribeEntries,
      setEntriesSelector,
      entriesLoading,
      entriesAmount,
      moreAvaible,
    } = useEntries($db)

    const {
      lists,
      listsLoading,
      subscribeList,
      setListSelector,
      listsAmount,
      moreListsAvaible,
    } = useLists($db)

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
        subscribeEntries({ page: currentPage.value })
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
          subscribeEntries({ page: 1, reset: true })
        } else {
          setListSelector(filter)
          subscribeList({ page: 1, reset: true })
        }
      },
      { deep: true }
    )

    onMounted(() => {
      subscribeEntries({ page: 1 })
      subscribeList({})
    })

    onUnmounted(() => {
      setFilters({ type: 'reset', item: '' })
    })

    return {
      type,
      setType,
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
      subscribeEntries,
      loadMore,
      currentPage,
      moreAvaible,
      scrollRef,
    }
  },
})
</script>
