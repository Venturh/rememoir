<template>
  <div class="flex flex-col w-full mb-2 space-y-2 md:mb-0 lg:w-80 bg-primary">
    <div class="flex justify-between">
      <TabNavigation
        v-if="!isListPrimaryFilter"
        class="sm:hidden"
        :amount="amount"
        @selected="passTab"
      />
      <span />
      <Button class="space-x-2" variant="brand25" @click="show = !show">
        <font-awesome-icon icon="align-center" />
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
          icon="clock"
          @selected="onChange"
        />
      </FilterItem>

      <FilterItem title="Categories">
        <Dropdown
          class="px-2"
          type="categories"
          :items="allCategories"
          icon="folder"
          @selected="onChange"
        />
      </FilterItem>

      <!-- <FilterItem title="Calendar">
        <Calendar @change="onChange" />
      </FilterItem> -->

      <FilterItem title="Misc">
        <div class="flex justify-between w-1/2 pl-2 space-x-2">
          <Tooltip position="under" text="Toggle preview">
            <IconOnlyButton
              class="p-2 border border-borderPrimary"
              @click="onChange({ type: 'preview', item: !previewFilter })"
            >
              <font-awesome-icon v-if="previewFilter" icon="square" />
              <font-awesome-icon v-else icon="layer-group" />
            </IconOnlyButton>
          </Tooltip>
          <Button
            class="w-full text-xs"
            variant="brand15"
            @click="$emit('filter', { type: 'reset', item: undefined })"
          >
            {{ t('reset') }}
          </Button>
        </div>
      </FilterItem>
      <Button @click="seedHandle('e')">Seed Entries</Button>
      <Button @click="seedHandle('l')">Seed Lists</Button>
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
