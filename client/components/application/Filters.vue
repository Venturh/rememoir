<template>
  <div class="flex flex-col w-full mb-2 space-y-2 md:mb-0 lg:w-80 bg-primary">
    <TabNavigation />
    <div class="flex justify-between">
      <Dropdown
        class="w-1/2"
        type="sort"
        :items="sort"
        :icon="ClockIcon"
        @selected="onChange"
      />
      <Dropdown
        class="w-1/2 pl-2"
        type="categories"
        :items="categories"
        :icon="FolderIcon"
        @selected="onChange"
      />
    </div>

    <div class="flex justify-between">
      <div class="flex justify-between w-1/2 space-x-2">
        <IconOnlyButton
          tooltip="Toggle preview"
          class="p-2 bg-secondary"
          @click="onChange({ type: 'preview', item: !previewFilter })"
        >
          <SquareIcon v-if="previewFilter" size="1.25x" />
          <LayoutIcon v-else size="1.25x" />
        </IconOnlyButton>
        <Button
          class="w-full text-xs"
          variant="1"
          @click="$emit('filter', { type: 'reset', item: undefined })"
        >
          {{ $t('reset') }}
        </Button>
      </div>
      <Dropdown
        v-if="!isListFilter"
        class="w-1/2 pl-2"
        type="list"
        :items="avaibleLists"
        :optional-item="{ text: 'None', info: 'DEFAULT' }"
        :icon="LayoutIcon"
        @selected="onChange"
      />
    </div>

    <Calendar @change="onChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { categories, sort } from '@/config/data'
import {
  FolderIcon,
  ListIcon,
  LayoutIcon,
  SquareIcon,
  ClockIcon,
} from 'vue-feather-icons'
import { Filters } from '@/types'

import { useAvaibleLists } from '@/hooks'

export default defineComponent({
  props: {
    isListFilter: {
      type: Boolean,
      default: false,
    },
  },
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
      sort,
      avaibleLists,
      onChange,
      previewFilter,
      FolderIcon,
      ListIcon,
      LayoutIcon,
      ClockIcon,
    }
  },
})
</script>
