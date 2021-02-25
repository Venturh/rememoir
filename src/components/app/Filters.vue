<template>
  <div class="flex flex-col w-full mb-2 space-y-2 md:mb-0 lg:w-80 bg-primary">
    <div class="flex justify-between">
      <TabNavigation
        v-if="!isListPrimaryFilter"
        class="sm:hidden"
        :items="['entries', 'lists']"
        :amount="amount"
        @selected="passTab"
      />
      <span />
      <Button class="space-x-2" variant="brand25" @click="show = !show">
        <icon :icon="RiAlignCenter" />
        <span>Filters </span>
        <Label small :rounded="false" variant="brand25">
          {{ filtersCount }}
        </Label>
      </Button>
    </div>

    <div class="space-y-2" :class="!show ? 'hidden' : 'block'">
      <FilterItem title="Order">
        <Dropdown
          type="order"
          class="px-2"
          :items="order"
          :icon="RiTimeLine"
          :border="true"
          @selected="onChange"
        />
      </FilterItem>

      <FilterItem title="Categories">
        <Dropdown
          class="px-2"
          type="categories"
          :items="allCategories"
          :icon="RiFolderLine"
          :border="true"
          @selected="onChange"
        />
      </FilterItem>

      <FilterItem title="Calendar">
        <Calendar @change="onChange" />
      </FilterItem>

      <FilterItem title="Misc">
        <div class="flex pl-2 space-x-4">
          <IconOnlyButton
            class="p-2 space-x-2 border border-borderPrimary"
            @click="onChange({ type: 'preview', item: !previewFilter })"
          >
            <Icon v-if="previewFilter" :icon="RiLayoutLine" />
            <Icon v-else :icon="RiLayoutRowLine" />
          </IconOnlyButton>
          <Button
            class="text-xs"
            :variant="filtersCount === 0 ? 'disabled' : 'brand25'"
            @click="$emit('filter', { type: 'reset', item: undefined })"
          >
            {{ t('reset') }}
          </Button>
        </div>
      </FilterItem>
      <!-- <Button @click="seedHandle('e')">Seed Entries</Button>
      <Button @click="seedHandle('l')">Seed Lists</Button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { categories, order } from '@/config/data'

import { Filters, MenuOption } from '@/types'

import { useAvaibleLists } from '@/hooks'
import { seed } from '@/db/entry'
import { seedLists } from '@/db/list'
import { getDb } from '@/db/Database'
import { useI18n } from 'vue-i18n'
import {
  RiAlignCenter,
  RiLayoutLine,
  RiLayoutRowLine,
  RiTimeLine,
  RiFolderLine,
} from 'vue-remix-icons'

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
    filtersCount: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['filter', 'tabSelected'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const previewFilter = ref(true)
    const db = getDb()
    const { avaibleLists } = useAvaibleLists(db)
    const show = ref(false)

    const allCategories: MenuOption = ([
      {
        icon: null,
        text: 'all_categories',
        info: 'DEFAULT',
        translate: true,
      },
    ] as MenuOption).concat(categories)

    function onChange({ type, item }: Filters) {
      if (type === 'preview') previewFilter.value = !previewFilter.value
      emit('filter', { item, type })
    }

    function passTab(val: number) {
      emit('tabSelected', val)
    }

    async function seedHandle(type: string) {
      if (type === 'e') await seed(db)
      else await seedLists(db)
    }

    return {
      RiAlignCenter,
      RiLayoutLine,
      RiLayoutRowLine,
      RiTimeLine,
      RiFolderLine,
      t,
      show,
      categories,
      order,
      avaibleLists,
      onChange,
      previewFilter,
      seedHandle,
      allCategories,
      passTab,
    }
  },
})
</script>
