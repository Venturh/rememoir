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
          <div ref="scrolLRef" class="space-y-4">
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
    const type = ref('entries')

    const { filters, setFilters, filtersCount } = useFilter()

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
      type.value === 'entries' ? entries.value : lists.value
    )

    function setType(val: number) {
      console.log('setType ~ val', val)
      type.value = val === 0 ? 'entries' : 'list'
    }

    const loading = computed(() => {
      return listsLoading.value || entriesLoading.value
    })

    watch(
      () => filters,
      (filter) => {
        showPreview.value = filter.preview ?? false
        if (type.value === 'entries') {
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
    }
  },
})
</script>
