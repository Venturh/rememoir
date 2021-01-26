<template>
  <div
    class="flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <div class="lg:w-screen lg:max-w-lg">
      <div v-if="loading" class="space-y-2">
        <div
          v-for="i in 4"
          :key="i"
          class="flex flex-col justify-center w-full h-64 pl-4 space-y-4 bg-secondary"
        >
          <Loading class="w-3/4 h-1/4 bg-primary" type="skeleton" />
          <Loading class="w-3/4 h-1/2 bg-primary" type="skeleton" />
        </div>
      </div>
      <NotFound
        v-if="!loading && Object.keys(lists).length === 0"
        class="mt-20"
        target="lists"
      />

      <div v-if="lists" class="grid gap-4">
        <div v-for="date in Object.keys(lists)" :key="date" class="">
          <!-- <div dark
            class="relative flex-shrink-0 w-3.5 h-3.5 rounded-full bg-brand -left-2 top-3.5"
          /> -->
          <div>
            <div class="px-2 py-1 text-lg font-medium rounded-md bg-secondary">
              {{ date }}
            </div>
            <div class="mt-2 space-y-2">
              <BaseList
                v-for="(list, index) in lists[date]"
                :key="index"
                v-bind="{
                  title: list.title,
                  description: list.description,
                  entries: list.entries,
                  categories: list.categories,
                  hashedKey: list.hashedKey,
                  calendarDate: list.calendarDate,
                  processing: list.processing,
                  updatedAt: list.updatedAt,
                  id: list.id,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Filters />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { getLists } from '@/db/list'
import { groupBy } from 'lodash'
import { ListInput } from '@/generated/graphql'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { $db, $dayjs } = useContext().app
    const loading = ref(true)
    const lists = ref({})

    onMounted(() => {
      const query = getLists($db)
      query.$.subscribe((results) => {
        loading.value = true
        const grouped = groupBy(results, (result: ListInput) =>
          $dayjs(parseInt(result.updatedAt)).calendar()
        )
        lists.value = grouped
        setTimeout(() => {
          loading.value = false
        }, 2000)
      })
    })

    return { loading, lists }
  },
})
</script>
