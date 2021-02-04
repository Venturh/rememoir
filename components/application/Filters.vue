<template>
  <div class="flex flex-col w-full mb-2 space-y-2 md:mb-0 lg:w-80 bg-primary">
    <div class="flex justify-between sm:hidden">
      <span v-if="isListPrimaryFilter" />
      <TabNavigation
        v-if="!isListPrimaryFilter"
        class="w-full"
        :amount="amount"
      />
      <Button class="space-x-2" variant="1" @click="show = !show">
        <AlignCenterIcon size="1.25x" />
        <span>Filters</span>
      </Button>
    </div>

    <div class="space-y-2 sm:block" :class="!show ? 'hidden' : 'block'">
      <Calendar @change="onChange" />
      <div
        class="flex flex-col justify-between space-y-2 lg:space-y-0 lg:flex-row"
      >
        <Dropdown
          class="lg:w-1/2"
          type="order"
          :items="order"
          :icon="ClockIcon"
          @selected="onChange"
        />
        <Dropdown
          class="lg:w-1/2 lg:pl-2"
          type="categories"
          :items="categories"
          :icon="FolderIcon"
          @selected="onChange"
        />
      </div>

      <div class="space-y-2 lg:flex lg:space-y-0 lg:justify-between">
        <Dropdown
          v-if="!isListFilter"
          class="lg:w-1/2"
          type="list"
          :items="avaibleLists"
          :optional-item="{ text: 'None', info: 'DEFAULT' }"
          :icon="LayoutIcon"
          @selected="onChange"
        />
        <div class="flex justify-between space-x-2 lg:w-1/2 lg:pl-2">
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
      </div>
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
