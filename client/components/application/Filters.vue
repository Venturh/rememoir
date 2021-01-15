<template>
  <div class="space-y-2">
    <div class="flex flex-wrap space-x-2">
      <IconOnlyButton
        class="p-2 bg-secondary"
        @click="onChange({ type: 'preview', item: !previewFilter })"
      >
        <SquareIcon v-if="previewFilter" size="1.25x" />
        <LayoutIcon v-else size="1.25x" />
      </IconOnlyButton>
      <Dropdown
        type="categories"
        :items="categories"
        :icon="FolderIcon"
        @selected="onChange"
      />

      <Dropdown
        type="categories"
        :items="['No Lists']"
        :icon="ListIcon"
        @selected="onChange"
      />
    </div>
    <Calendar @change="onChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { categories } from '@/config/data'
import { FolderIcon, ListIcon, LayoutIcon, SquareIcon } from 'vue-feather-icons'
import { Filters } from '@/types'

export default defineComponent({
  components: {
    LayoutIcon,
    SquareIcon,
  },
  setup(props, { emit }) {
    const previewFilter = ref(true)
    function onChange({ type, item }: Filters) {
      if (type === 'preview') previewFilter.value = !previewFilter.value
      emit('filter', { item, type })
    }
    return { categories, onChange, previewFilter, FolderIcon, ListIcon }
  },
})
</script>
