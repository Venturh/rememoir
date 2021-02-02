<template>
  <div
    class="relative flex flex-col w-full h-full px-3 py-3 space-y-3 rounded-lg bg-secondary"
  >
    <div>
      <div class="flex items-center justify-between">
        <span>{{ entry.title }}</span>
        <BaseEntryActions :entry="entry" :is-list-entry="isListEntry" />
      </div>

      <p v-if="entry.description" class="">{{ entry.description }}</p>
    </div>
    <LinkEntry
      v-if="entry.type === 'Link' && showPreview"
      :url="entry.url"
      :preview="entry.preview"
    />

    <div class="flex items-center justify-between">
      <div class="space-x-2">
        <span
          v-for="category in entry.categories"
          :key="category"
          class="px-2 py-1.5 text-xs rounded-lg bg-primary"
        >
          {{ category }}
        </span>
      </div>
      <span class="text-sm">{{ timeFrom }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Entry } from '@/generated/graphql'
import {
  computed,
  defineComponent,
  PropType,
  useContext,
} from '@nuxtjs/composition-api'

import { MoreVerticalIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    MoreVerticalIcon,
  },
  props: {
    entry: {
      type: Object as PropType<Entry>,
      default: () => {},
    },
    showPreview: {
      type: Boolean,
      default: true,
    },
    isListEntry: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const dayjs = useContext().app.$dayjs
    const timeFrom = computed(() => {
      return dayjs(parseInt(props.entry.updatedAt)).fromNow()
    })

    return {
      timeFrom,
    }
  },
})
</script>
