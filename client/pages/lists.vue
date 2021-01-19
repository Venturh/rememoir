<template>
  <div
    class="flex flex-col-reverse items-start lg:space-x-6 lg:flex-row lg:justify-between lg:items-start"
  >
    <h1 v-if="awaitReplication">Waiting for awaitReplication</h1>

    <div class="lg:w-screen lg:max-w-lg">
      <NotFound
        v-if="!awaitReplication && Object.keys(lists).length === 0"
        class="mt-20"
        target="lists"
      />
      <Button @click="add"> Add List </Button>

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
              <div v-for="(list, index) in lists[date]" :key="index">
                {{ list.title }}
                <h1 v-for="entry in list.entries" :key="entry.id">
                  {{ entry.contentText }}
                </h1>
              </div>
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
import { getLists, addList } from '@/db/list'
import { groupBy } from 'lodash'
import { ListInput } from '@/generated/graphql'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { $db, $dayjs } = useContext().app
    const awaitReplication = ref(true)
    const lists = ref({})

    onMounted(async () => {
      const query = await getLists($db)
      query.$.subscribe(async (results) => {
        awaitReplication.value = true
        const grouped = await groupBy(results, (result: ListInput) =>
          $dayjs(parseInt(result.updatedAt)).calendar()
        )
        lists.value = grouped
        awaitReplication.value = false
      })
      awaitReplication.value = false
    })

    async function add() {
      await addList($db)
    }

    return { awaitReplication, lists, add }
  },
})
</script>
