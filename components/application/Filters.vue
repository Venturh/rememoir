<template>
  <div class="flex flex-col w-full mb-2 space-y-2 md:mb-0 lg:w-80 bg-primary">
    <div class="flex justify-between">
      <TabNavigation
        v-if="!isListPrimaryFilter"
        class="sm:hidden"
        :amount="amount"
      />
      <Button class="space-x-2 sm:w-full" variant="1" @click="show = !show">
        <AlignCenterIcon size="1.25x" />
        <span>Filters</span>
      </Button>
    </div>

    <div class="space-y-2" :class="!show ? 'hidden' : 'block'">
      <FilterItem title="Order">
        <Dropdown
          type="order"
          class="px-2"
          :items="order"
          :icon="ClockIcon"
          @selected="onChange"
        />
      </FilterItem>

      <FilterItem title="Categories">
        <Dropdown
          class="px-2"
          type="categories"
          :items="categories"
          :icon="FolderIcon"
          @selected="onChange"
        />
      </FilterItem>

      <FilterItem v-if="!isListFilter" title="Lists">
        <Dropdown
          class="px-2"
          type="list"
          :items="avaibleLists"
          :icon="LayoutIcon"
          @selected="onChange"
        />
      </FilterItem>

      <FilterItem title="Calendar">
        <Calendar @change="onChange" />
      </FilterItem>

      <FilterItem title="Misc">
        <div class="flex justify-between w-1/2 pl-2 space-x-2">
          <IconOnlyButton
            tooltip="Toggle preview"
            class="p-2 border border-borderPrimary"
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
      </FilterItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { categories, order } from '@/config/data'
import {
  FolderIcon,
  ListIcon,
  LayoutIcon,
  SquareIcon,
  ClockIcon,
  AlignCenterIcon,
} from 'vue-feather-icons'
import { Filters } from '@/types'

import { useAvaibleLists } from '@/hooks'

export default defineComponent({
  props: {
    isListFilter: {
      type: Boolean,
      default: false,
    },
    isListPrimaryFilter: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    LayoutIcon,
    SquareIcon,
    AlignCenterIcon,
  },
  setup(_, { emit }) {
    const previewFilter = ref(true)
    const { $db } = useContext().app
    const { avaibleLists } = useAvaibleLists($db)
    const show = ref(false)

    function onChange({ type, item }: Filters) {
      if (type === 'preview') previewFilter.value = !previewFilter.value
      emit('filter', { item, type })
    }

    return {
      show,
      categories,
      order,
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
