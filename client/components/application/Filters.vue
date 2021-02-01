<template>
  <div class="flex flex-col lg:flex-col-reverse">
    <div class="flex justify-end space-x-2">
      <IconOnlyButton
        tooltip="Toggle preview"
        class="p-2 bg-secondary"
        @click="onChange({ type: 'preview', item: !previewFilter })"
      >
        <SquareIcon v-if="previewFilter" size="1.25x" />
        <LayoutIcon v-else size="1.25x" />
      </IconOnlyButton>
      <Dropdown
        class="w-1/3"
        type="categories"
        :items="categories"
        :icon="FolderIcon"
        @selected="onChange"
      />

      <Dropdown
        class="w-1/3"
        type="categories"
        :items="avaibleLists"
        :optional-item="{ text: 'None' }"
        :icon="LayoutIcon"
        @selected="onChange"
      />
      <Button
        class="text-xs"
        variant="1"
        @click="$emit('change', { type: 'date', item: undefined })"
      >
        {{ $t('reset') }}
      </Button>
    </div>
    <Calendar class="mt-4 lg:mt-0" @change="onChange" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { categories } from '@/config/data'
import { FolderIcon, ListIcon, LayoutIcon, SquareIcon } from 'vue-feather-icons'
import { Filters } from '@/types'
import { useQueryLists } from '@/hooks/database'

export default defineComponent({
  components: {
    LayoutIcon,
    SquareIcon,
  },
  setup(_, { emit }) {
    const previewFilter = ref(true)
    const { $db } = useContext().app
    const { lists, execute } = useQueryLists($db)

    const avaibleLists = computed(() => {
      if (lists.value.length > 0) {
        return lists.value.map((l) => {
          return { text: l.title }
        })
      } else return [{ text: 'No List' }]
    })

    function onChange({ type, item }: Filters) {
      if (type === 'preview') previewFilter.value = !previewFilter.value
      emit('filter', { item, type })
    }

    onBeforeMount(() => execute())

    return {
      categories,
      avaibleLists,
      onChange,
      previewFilter,
      FolderIcon,
      ListIcon,
      LayoutIcon,
    }
  },
})
</script>
