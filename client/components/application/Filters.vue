<template>
  <div class="flex flex-col w-full mb-2 space-y-2 md:mb-0 lg:w-80 bg-primary">
    <TabNavigation />
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
        type="list"
        :items="avaibleLists"
        :optional-item="{ text: 'None' }"
        :icon="LayoutIcon"
        @selected="onChange"
      />
      <Button
        class="text-xs"
        variant="1"
        @click="$emit('filter', { type: 'reset', item: undefined })"
      >
        {{ $t('reset') }}
      </Button>
    </div>
    <Calendar @change="onChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { categories } from '@/config/data'
import { FolderIcon, ListIcon, LayoutIcon, SquareIcon } from 'vue-feather-icons'
import { Filters } from '@/types'

import { useAvaibleLists } from '@/hooks'

export default defineComponent({
  components: {
    LayoutIcon,
    SquareIcon,
  },
  setup(_, { emit }) {
    const previewFilter = ref(true)
    const { $db } = useContext().app
    const { avaibleLists } = useAvaibleLists($db)

    function onChange({ type, item }: Filters) {
      if (type === 'preview') previewFilter.value = !previewFilter.value
      emit('filter', { item, type })
    }

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
